/* Billmint demo — vanilla JS, no dependencies.
   1. Mobile navigation toggle
   2. Monthly / yearly pricing switch
   3. FAQ accordion (one open at a time, keyboard accessible)
   4. Front-end-only contact form validation
   5. Reveal-on-scroll animation
*/
(function () {
  "use strict";

  /* ---------- 1. Mobile nav ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    // Close the menu after choosing a link (mobile)
    nav.addEventListener("click", function (event) {
      if (event.target.tagName === "A" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close on Escape
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  /* ---------- 2. Pricing toggle ---------- */
  const toggleButtons = document.querySelectorAll(".toggle-btn");
  const amounts = document.querySelectorAll(".price .amount");
  const periods = document.querySelectorAll(".price .period");

  toggleButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const period = button.dataset.period; // "monthly" | "yearly"

      toggleButtons.forEach(function (b) {
        const active = b === button;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });

      amounts.forEach(function (el) {
        el.textContent = el.dataset[period];
      });
      periods.forEach(function (el) {
        el.textContent = period === "yearly" ? "/ month, billed yearly" : "/ month";
      });
    });
  });

  /* ---------- 3. FAQ accordion ---------- */
  const triggers = document.querySelectorAll(".accordion-trigger");

  function setOpen(trigger, open) {
    const panel = document.getElementById(trigger.getAttribute("aria-controls"));
    trigger.setAttribute("aria-expanded", String(open));
    if (panel) panel.classList.toggle("is-open", open);
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";
      triggers.forEach(function (t) { setOpen(t, false); });
      setOpen(trigger, !isOpen);
    });
  });

  // Open the first question by default so the section doesn't look empty
  if (triggers.length) setOpen(triggers[0], true);

  /* ---------- 4. Contact form (front-end only) ---------- */
  const form = document.getElementById("contact-form");

  if (form) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function showError(input, message) {
      const field = input.closest(".field");
      const error = field ? field.querySelector(".error") : null;
      if (field) field.classList.toggle("is-invalid", Boolean(message));
      if (error) error.textContent = message || "";
    }

    function validate(input) {
      const value = input.value.trim();
      if (input.required && !value) {
        showError(input, "This field is required.");
        return false;
      }
      if (input.type === "email" && value && !emailPattern.test(value)) {
        showError(input, "Please enter a valid email address.");
        return false;
      }
      showError(input, "");
      return true;
    }

    const inputs = form.querySelectorAll("input[required], textarea[required], input[type=email]");

    inputs.forEach(function (input) {
      input.addEventListener("blur", function () { validate(input); });
      input.addEventListener("input", function () {
        if (input.closest(".field").classList.contains("is-invalid")) validate(input);
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      let valid = true;
      inputs.forEach(function (input) {
        if (!validate(input)) valid = false;
      });

      if (!valid) {
        const firstInvalid = form.querySelector(".field.is-invalid input, .field.is-invalid textarea");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Demo only: nothing is sent anywhere.
      const success = form.querySelector(".form-success");
      const submit = form.querySelector("button[type=submit]");
      submit.disabled = true;
      submit.textContent = "Sending…";

      window.setTimeout(function () {
        form.reset();
        submit.disabled = false;
        submit.textContent = "Send message";
        success.hidden = false;
        success.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 700);
    });
  }

  /* ---------- 5. Reveal on scroll ---------- */
  const revealTargets = document.querySelectorAll(
    ".feature, .plan, .accordion-item, .testimonial blockquote, .contact-form, .stats-grid > div"
  );

  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();

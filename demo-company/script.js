/* Meridian Studio demo — vanilla JS, no dependencies.
   1. Mobile navigation toggle
   2. Reveal-on-scroll animation
   3. Active nav link highlighting while scrolling
*/
(function () {
  "use strict";

  /* ---------- 1. Mobile nav ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");

  if (navToggle && nav) {
    function closeNav() {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }

    navToggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a") && nav.classList.contains("is-open")) closeNav();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav();
        navToggle.focus();
      }
    });
  }

  /* ---------- 2. Reveal on scroll ---------- */
  const revealTargets = document.querySelectorAll(
    ".service, .case, .process li, .quote, .about-visual, .about-copy, .hero-stats"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- 3. Active nav link ---------- */
  const sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  const navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav a:not(.btn)"));

  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const id = "#" + entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle("is-current", link.getAttribute("href") === id);
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (section) { sectionObserver.observe(section); });
  }
})();

# Portfolio demos — Kah Seng Phoon

Two small, honest demo websites built to show front-end work for freelance enquiries.
They are **personal demo projects**, not real client work. Every company, product,
client name and testimonial on these pages is fictional.

| Folder | What it is | Highlights |
| --- | --- | --- |
| [`demo-saas/`](demo-saas/) | **Billmint** — landing page for a fictional small-business invoicing tool | Hero, feature grid, 3-tier pricing with monthly/yearly toggle, FAQ accordion, front-end-only contact form with validation |
| [`demo-company/`](demo-company/) | **Meridian Studio** — profile site for a fictional web design agency | Services, SVG case-study cards, process, about section, testimonials, WhatsApp contact button (`wa.me` link) |

Both sites are plain **HTML + CSS + vanilla JavaScript**. No framework, no build step,
no dependencies. They are responsive from phone width up and use Google Fonts as the only
external resource.

## Run locally

Any static file server works. From this folder:

```bash
python -m http.server 8080
```

Then open:

- http://localhost:8080/ — index page linking to both demos
- http://localhost:8080/demo-saas/
- http://localhost:8080/demo-company/

If Python is not installed, `npx serve .` (needs Node) does the same job, and opening the
`index.html` files directly from disk also works.

## Deploy

### Option A — GitHub Pages (one command after the first push)

1. Create an empty GitHub repository, e.g. `portfolio-demos`.
2. Push this folder to it:

   ```bash
   git init && git add . && git commit -m "Portfolio demos" && git branch -M main && git remote add origin https://github.com/<your-username>/portfolio-demos.git && git push -u origin main
   ```

3. Turn on Pages with the GitHub CLI (or in **Settings → Pages → Branch: main / root**):

   ```bash
   gh api -X POST repos/<your-username>/portfolio-demos/pages -f "source[branch]=main" -f "source[path]=/"
   ```

After a minute the sites are live at:

- `https://<your-username>.github.io/portfolio-demos/` (index page)
- `https://<your-username>.github.io/portfolio-demos/demo-saas/`
- `https://<your-username>.github.io/portfolio-demos/demo-company/`

Every later `git push` to `main` redeploys automatically. The `.nojekyll` file in the root
tells GitHub to serve the files exactly as they are.

### Option B — Vercel (one command)

Install the CLI once (`npm i -g vercel`), then from this folder:

```bash
vercel --prod
```

Accept the defaults when prompted (no framework, no build command, output directory `.`).
Vercel prints a public URL such as `https://portfolio-demos.vercel.app`. The two demos
live at `/demo-saas/` and `/demo-company/` under it. Run the same command again to redeploy.

## Linking from LinkedIn

In the LinkedIn **Featured** section add each demo URL as a link. Suggested titles:

- *Demo: SaaS landing page (Billmint) — personal project*
- *Demo: Agency website (Meridian Studio) — personal project*

Keep the word "demo" in the title so nobody mistakes them for client work.

## Customising

- Replace the placeholder WhatsApp number `6500000000` in `demo-company/index.html`
  (two places) with a real number in international format, without `+` or spaces.
- The contact form in `demo-saas/` is front-end only. To make it send email, point it at a
  form service (Formspree, Basin, Netlify Forms) or a small serverless function.
- Colours and spacing are CSS custom properties at the top of each `styles.css`.

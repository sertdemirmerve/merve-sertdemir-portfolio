# Merve Sertdemir — Data Analyst Portfolio

A single-page, responsive portfolio site built with plain HTML, CSS and
JavaScript (no build step, no framework). Designed for Junior Data
Analyst / Data Analyst Intern / Business Analyst applications.

**Live sections:** Home · About · Skills · Projects · Experience ·
Education · Contact — with a dark/light theme toggle that remembers
your choice.

---

## File structure

```
portfolio/
├── index.html              # all page content and structure
├── robots.txt               # search-engine crawl rules
├── sitemap.xml               # search-engine sitemap
├── css/
│   └── style.css           # design system + all styling (dark & light themes)
├── js/
│   └── main.js              # theme toggle, mobile nav, scroll spy,
│                             #  hero typing effect, skills data, contact form
├── assets/
│   ├── images/
│   │   ├── og-image.png      # link-preview image (LinkedIn, email, WhatsApp)
│   │   ├── olist/            # Olist e-commerce project screenshots
│   │   └── breast-cancer/    # ML project screenshots
│   └── cv/
│       └── Merve_Sertdemir_CV.pdf
└── README.md
```

## Before you publish

- **CV:** `assets/cv/Merve_Sertdemir_CV.pdf` is already in place — the
  "Download CV" button works as-is. Note that this file includes your
  phone number and your references' contact details, at your request.
  If you ever want to swap in an updated or redacted version, just
  replace the file (keep the same filename) — no code changes needed.

- **Contact form:** submitting it opens the visitor's email client with
  a pre-filled message (via a `mailto:` link) — no backend, nothing
  stored anywhere. This works everywhere with zero setup. If you'd
  rather receive submissions directly, you can swap it for a free form
  backend like [Formspree](https://formspree.io) or
  [Web3Forms](https://web3forms.com): sign up, get an endpoint/access
  key, and replace the `submit` handler in `js/main.js` with a
  `fetch()` POST to that endpoint. Not required — just an option.

## Editing content

Everything is in plain HTML/JS, so it's easy to update without touching
the design:

- **Text content** (About, Experience, Education, project descriptions):
  edit directly in `index.html`.
- **Skills and proficiency levels:** edit the `categories` array near the
  top of `js/main.js` — the table renders itself from that data, so you
  don't need to touch any HTML to add or change a skill.
- **Project screenshots:** replace files in `assets/images/`, keeping the
  same filenames, or update the `src` paths in `index.html` if you rename them.
- **Colors/fonts:** all design tokens are CSS variables at the top of
  `css/style.css` (`:root` for dark theme, `[data-theme='light']` for light).

## Running locally

No build tools needed — just serve the folder. From this directory:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

or with Node's `npx serve`, or simply open `index.html` directly in a browser
(note: opening via `file://` can block some features in a few browsers —
a local server is safer).

## After you deploy: update the placeholder domain

For search engines and link previews (LinkedIn, WhatsApp, email) to work
correctly, a few tags need your **real** URL instead of the placeholder
`https://merve-sertdemir-portfolio.vercel.app/` used in this template.
Once you know your final URL (Vercel gives you one immediately after
deploying, or use your custom domain if you set one up), update it in
these 4 places:

- `index.html` — the `<link rel="canonical">` tag and the four
  `og:url` / `og:image` / `twitter:image` meta tags in the `<head>`
- `robots.txt` — the `Sitemap:` line
- `sitemap.xml` — the `<loc>` value

A quick find-and-replace of `merve-sertdemir-portfolio.vercel.app` with
your actual domain across these 3 files covers it.

## Deploying

### Option A — Vercel (recommended)

1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, and
   click **Add New → Project**.
3. Select your repository. Vercel auto-detects it as a static site —
   leave the build command empty and the output directory as `./`.
4. Click **Deploy**. You'll get a live URL
   (e.g. `merve-sertdemir.vercel.app`) in under a minute, and every future
   push to `main` redeploys automatically.
5. Optional: add a custom domain under Project → Settings → Domains.

### Option B — GitHub Pages

1. Push this folder to a GitHub repository.
2. Go to the repo's **Settings → Pages**.
3. Under "Build and deployment", set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`.
4. Save. Your site will be live at
   `https://<your-username>.github.io/<repo-name>/` within a few minutes.

## Notes on the reference contacts from the CV

The references listed in your CV (names, titles, phone numbers, emails)
are **not** shown anywhere on the site itself — the About, Experience
and Contact sections only include information you'd expect to be
public. They do appear in the downloadable CV file, since you asked
for it to be included as-is.

# Ryno Boshoff — CV Website

Personal CV / portfolio site for Ryno Boshoff — IAM & Cybersecurity Engineer.

Live at: https://rynoboshoffza.github.io/ryno-cv-website/

## Stack

Plain HTML/CSS/JS — no build step, no dependencies beyond Google Fonts.
Deployed via GitHub Pages (Actions workflow, see `.github/workflows/deploy.yml`).

## Structure

```
index.html        Page markup
css/styles.css     Design system + layout
js/main.js         Nav, scroll-reveal, hero terminal animation
assets/            Favicon and static assets
```

## Local preview

Any static file server works, e.g.:

```bash
python -m http.server 8080
```

Then open http://localhost:8080.

## Content notes

The "AI Projects" section showcases other personal repos at a high level only.
All of those repos are private, and any visuals (e.g. the finance app dashboard)
are stylised/blurred mockups — no real account data, amounts, or infrastructure
details (IPs, hostnames, etc.) are ever shown here.

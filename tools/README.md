# Site build tools

Static site generator for the 7 Petals website. Run from `tools/` after `npm install`:

- `node pptx-extract.mjs <pptx> <outDir>` / `node pdf-extract.mjs <pdf> <outDir>` – pull photos/text out of the client documents in `../7petal-pdf` (output expected in `.cache/newppt`, `.cache/hard`, `.cache/prof`).
- `node build-images.mjs` – builds responsive WebP files in `assets/img` from `images.config.mjs`.
- `node build-site.mjs` – writes every HTML page, `sitemap.xml` and `robots.txt` into the project root from `site/data.mjs`.
- `node check-links.mjs` – verifies all local links, images and anchors.

Edit content in `site/data.mjs`, then re-run `build-site.mjs`. Don't hand-edit generated HTML.

> **Warning (Oct 2026):** `build-site.mjs` is currently out of date with the live site. It generates the newer "v2" page variant (`v2.css`, `v2.js`, lightbox dialog) and would overwrite the live inner pages, which have since been edited directly (breadcrumbs removed, `v2.css` footer link, redesigned About "Why choose us", layered service-page intro images, gallery collage classes, etc.). **Do not run it** unless you first port those changes into the generator. The HTML files in the project root are the source of truth.

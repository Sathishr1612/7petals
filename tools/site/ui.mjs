// Page shell and helpers. Pages reuse the home page's head, header/footer includes, cursor and scripts
// so every inner page shares the home page design (Bootstrap + assets/css/style.css).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE } from './data.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
export const IM = JSON.parse(fs.readFileSync(path.join(here, '..', 'images.manifest.json'), 'utf8'));

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** "Line one|Line two" → line one, then line two in the italic accent (matches the home page headings). */
export const split = (t) => {
  if (t.includes('|')) { const [a, b] = t.split('|'); return `${esc(a)}<br><em>${esc(b)}</em>`; }
  const w = t.split(' ');
  if (w.length < 2) return esc(t);
  const k = Math.ceil(w.length / 2);
  return `${esc(w.slice(0, k).join(' '))}<br><em>${esc(w.slice(k).join(' '))}</em>`;
};

/** Responsive <img> for a manifest id. Use full:true to point src at the large variant (lightbox). */
export function img(id, { sizes = '100vw', alt, loading = 'lazy', priority = false, cls = '', full = false } = {}) {
  const m = IM[id];
  if (!m) throw new Error(`Unknown image id: ${id}`);
  const ws = m.widths;
  const srcset = ws.map((w) => `assets/img/${id}-${w}.webp ${w}w`).join(', ');
  const big = ws.filter((x) => x <= 1280).at(-1) ?? ws.at(-1);
  const mid = full ? big : ws.find((w) => w >= 800) || ws.at(-1);
  const attrs = [
    `src="assets/img/${id}-${mid}.webp"`,
    ws.length > 1 ? `srcset="${srcset}" sizes="${sizes}"` : '',
    `width="${m.w}" height="${m.h}"`,
    `alt="${esc(alt ?? m.alt)}"`,
    priority ? 'fetchpriority="high" decoding="async"' : `loading="${loading}" decoding="async"`,
    cls ? `class="${cls}"` : '',
  ].filter(Boolean);
  return `<img ${attrs.join(' ')}>`;
}

export const breadcrumbLd = (trail) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: trail.map(([label, href], i) => ({ '@type': 'ListItem', position: i + 1, name: label, ...(href ? { item: `${SITE.domain}/${href}` } : {}) })),
});

const orgLd = {
  '@context': 'https://schema.org', '@type': 'Organization',
  name: SITE.name, alternateName: SITE.short, url: SITE.domain + '/', logo: `${SITE.domain}/${SITE.logo}`,
  email: SITE.email, telephone: SITE.tel, foundingDate: SITE.founded,
  address: { '@type': 'PostalAddress', addressLocality: 'Vikhroli (East), Mumbai', postalCode: '400083', addressRegion: 'Maharashtra', addressCountry: 'IN' },
};

export function page({ file, title, desc, body, ogImage = 'hero-courtyard', ld = [], noindex = false }) {
  const url = `${SITE.domain}/${file}`;
  const ws = IM[ogImage].widths;
  const og = `${SITE.domain}/assets/img/${ogImage}-${ws.filter((x) => x <= 1280).at(-1) ?? ws.at(-1)}.webp`;
  const ldAll = [...(file === 'contact.html' ? [orgLd] : []), ...ld];
  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  ${noindex ? '<meta name="robots" content="noindex">\n  ' : ''}<link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(SITE.short)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${og}">
  <meta name="twitter:card" content="summary_large_image">

  <link rel="icon" type="image/png" href="assets/images/new-images/logo.png">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Marcellus&family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Syne:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">

  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
  <link rel="stylesheet" href="assets/css/v2.css">
  <script>document.documentElement.classList.add('v2-js')</script>
${ldAll.map((o) => `  <script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
</head>

<body>

  <!-- Custom Cursor Micro-Interaction -->
  <div class="cursor-dot"></div>
  <div class="cursor-circle"></div>

  <div data-include="header.html"></div>

  <main id="main" class="v2">
${body}
  </main>

  <div data-include="footer.html"></div>

  <dialog class="v2 v2-lb" id="v2-lb" aria-label="Image viewer"><div class="v2-lb-in"><span class="v2-lb-count" aria-live="polite"></span><button class="v2-lb-btn v2-lb-x" type="button" aria-label="Close image"><i class="bi bi-x-lg"></i></button><button class="v2-lb-btn v2-lb-p" type="button" aria-label="Previous image"><i class="bi bi-chevron-left"></i></button><button class="v2-lb-btn v2-lb-n" type="button" aria-label="Next image"><i class="bi bi-chevron-right"></i></button><div class="v2-lb-stage"><img alt="" decoding="async"></div><p class="v2-lb-cap"></p></div></dialog>
  <p class="v2-sr" id="v2-live" role="status" aria-live="polite" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)"></p>

  <script src="assets/js/include.js"></script>
  <script src="assets/js/animations.js"></script>
  <script src="assets/js/main.js"></script>
  <script src="assets/js/inner-nav.js"></script>
  <script src="assets/js/v2.js"></script>
</body>

</html>
`;
}

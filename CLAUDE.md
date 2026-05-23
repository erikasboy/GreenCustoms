# Green Customs Guitar — Website Build Brief

> This file is the complete spec for Claude Code operating in YOLO mode.
> Build the entire site from this document. Do not ask the owner questions — use filler text
> where content is TBD and note it with <!-- TODO: owner to update --> comments.

---

## Owner / Contact
- **Name:** Chris Schryer
- **Instagram:** @ChrisSchryer (personal), @GreenCustomsGuitars (business)
- **Form submissions email:** erikas.boy@gmail.com
- **Payment:** PayPal.me (handle TBD — use `paypal.me/HANDLE` as placeholder) + Interac e-transfer to erikas.boy@gmail.com for Canadians

---

## Business Areas
1. **Repair & Restoration** — guitar repair and restoration services
2. **Electric Rebuilds** — import electrics fully rebuilt: all electronics + hardware replaced. "Nearly US build quality for a bit cheaper than Mexican build price" (think Fender MIM vs American)
3. **Side Quest Pickups** — hand-wound pickups for sale; also does pickup repair. This is a sub-brand.
4. **Acoustic Builds** — hand-building acoustics (just starting out — "coming soon" framing is appropriate)

---

## Tech Stack

| Layer | Choice |
|---|---|
| Static site generator | **Eleventy (11ty)** |
| Templates | **Nunjucks** (.njk) |
| CSS | **Vanilla CSS** with custom properties, mobile-first |
| JS | **Vanilla JS**, no framework |
| CMS | **Decap CMS** at `/admin/` (phone-friendly web UI) |
| Hosting | **Netlify** (free tier) |
| Forms | **Netlify Forms** (just add `netlify` attribute to `<form>`) |
| Auth for CMS | **Netlify Identity** + Git Gateway |
| Source | **GitHub** repo (Netlify deploys on every push to main) |

### Bootstrap commands (run these first)
```bash
npm init -y
npm install @11ty/eleventy
```

### Dev / build
```bash
npx @11ty/eleventy --serve   # local dev server with live reload
npx @11ty/eleventy           # production build → outputs to _site/
```

---

## Directory Structure

```
F:\Vibe Coding\GreenCustoms\
├── CLAUDE.md                      # This file
├── netlify.toml
├── package.json
├── .eleventy.js
├── public/
│   └── images/
│       ├── green-customs-logo.png   # copy of "Green Customs Logo.png" from root
│       ├── IMG_1584.jpeg            # Creston Tele rebuild — product listing
│       ├── IMG_1585.jpeg            # Acoustic in-repair state — repairs page hero
│       ├── IMG_1586.jpeg            # SSS Strat pickup set — product listing
│       └── IMG_1587.jpeg            # SQ-90 single pickup — product listing
└── src/
    ├── _data/
    │   └── site.json
    ├── _includes/
    │   ├── base.njk               # Master layout: <head>, header, footer, mobile nav
    │   ├── header.njk             # Logo left, nav right (desktop)
    │   ├── footer.njk
    │   └── product-card.njk       # Reusable product card macro
    ├── assets/
    │   ├── css/
    │   │   └── style.css
    │   └── js/
    │       └── main.js
    ├── content/
    │   └── products/
    │       ├── creston-tele-rebuild.md
    │       ├── sqp-strat-set.md
    │       └── sqp-sq90.md
    ├── admin/
    │   ├── index.html             # Decap CMS entry point
    │   └── config.yml
    ├── index.njk                  # Home
    ├── about.njk
    ├── repairs.njk
    ├── rebuilds.njk
    ├── pickups.njk
    ├── acoustics.njk
    ├── shop.njk
    ├── shop-item.njk              # Individual product page template
    ├── service-request.njk
    └── contact.njk
```

---

## Color Palette

Derived from the fox palette image (paperheartdesign.com) in the project root.

```css
:root {
  --color-bg:      #C9BBA8;   /* Sandy warm beige — primary background */
  --color-bg-alt:  #DDD3C3;   /* Slightly lighter — cards, inputs, nav bg */
  --color-taupe:   #8C7B68;   /* Warm taupe — borders, secondary text, dividers */
  --color-olive:   #5C6B4A;   /* Muted olive green — primary CTA, buttons, links, active states */
  --color-sienna:  #A8531C;   /* Burnt sienna — use sparingly: badges, sale tags, hover accents */
  --color-dark:    #2C2E1E;   /* Very dark olive/charcoal — ALL body text, headings */
  --color-warm-white: #F5F0EA; /* Warm off-white — text/logo on dark backgrounds */
}
```

**Rules:**
- Never use pure `#000` or `#fff` — always use palette equivalents
- `--color-olive` is the hero action color (buttons, links, active nav)
- `--color-sienna` is optional — owner is least committed to it. Use for badges like "New" or "Available" tags only
- The Green Customs logo is black — it works on `--color-bg` and `--color-bg-alt`. On dark sections, apply `filter: brightness(0) invert(1)` to show it white

---

## Typography

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet">
```

```css
--font-heading: 'Playfair Display', Georgia, serif;  /* h1–h3, hero text */
--font-body:    'Inter', system-ui, sans-serif;       /* everything else */
```

- Headings: Playfair Display 700 — elegant, complements the script logo without competing
- Body: Inter — clean, readable, modern
- All caps sparingly: Inter 600 with letter-spacing for labels/categories

---

## Logo & Branding

- **File:** `public/images/green-customs-logo.png`
- The logo is a flowing script "Green" with a large swash/flourish above, and "CUSTOMS" in clean caps below. Black on transparent background.
- **Header placement:** Left-aligned, height ~40px on desktop, ~32px on mobile
- **On light backgrounds:** render as-is (black)
- **On dark/olive backgrounds:** `filter: brightness(0) invert(1)` for white version
- **Side Quest Pickups:** No logo yet. Display as styled text: `font-family: var(--font-heading); font-style: italic;` — treat it as a "label" or "sub-brand" badge on the pickups page

---

## Navigation Structure

```
Home  |  Shop ▾  |  Services  |  About ▾  |  Contact
                    |                |
              Rebuilt Electrics   Our Story
              Side Quest Pickups  Repair & Restoration
              Acoustic Guitars    Electric Rebuilds
                                  Side Quest Pickups
                                  Acoustic Builds
```

### Desktop header
- Sticky, full-width
- Logo left, nav links right
- Background: `--color-bg-alt` with a subtle bottom border in `--color-taupe`
- Dropdowns on hover (CSS only, no JS required for basic version)

### Mobile / Tablet (≤768px) — **Bottom Tab Bar** (app-like)
Replace the top nav links entirely with a fixed bottom tab bar. This is the key "app feel" requirement.

```
[ Home ]  [ Shop ]  [ Services ]  [ About ]  [ Contact ]
  icon      icon       icon          icon       icon
```

- Fixed to bottom of viewport
- Background: `--color-dark`, icons + labels in `--color-warm-white`
- Active tab: `--color-olive` tint on icon + label
- Respect iOS safe area: `padding-bottom: env(safe-area-inset-bottom)`
- Height: 56px + safe area
- Icons: use inline SVG or a small icon set (Lucide or Heroicons — load only what's needed via CDN or inline)
- The header on mobile shows only the logo (centered or left) — no nav links

---

## Pages — Full Spec

### Home (`src/index.njk`)

**Hero section**
- Full-viewport-height hero
- Background: the Creston Tele image (`IMG_1584.jpeg`) with a dark gradient overlay (`--color-dark` at ~70% opacity, left-to-right or bottom-up)
- Headline: `Green Customs` (large, `--font-heading`, `--color-warm-white`)
- Sub-headline: `Custom guitar work from a player's perspective.`
- Two CTA buttons: "Browse the Shop" (primary, `--color-olive`) and "Request a Service" (secondary, outlined)

**Featured listings**
- Section heading: "Currently Available"
- Horizontal scroll carousel of product cards — CSS `scroll-snap-type: x mandatory` on the container, `scroll-snap-align: start` on each card
- Touch/swipe works natively (no JS library needed)
- On desktop: show 3 cards in a row (no carousel needed, just a grid)
- Show all 3 dummy products
- Each card: image (aspect-ratio 4/3, object-fit cover), product title, category tag, price, "View Details" link

**Services strip**
- 4 equal columns (2×2 on mobile)
- Each: icon or small image, service name, one-line description, link to detail page
- Services: Repair & Restoration | Electric Rebuilds | Side Quest Pickups | Acoustic Builds
- Background: `--color-dark`, text `--color-warm-white`, icons `--color-olive`

**About blurb**
- 2-column layout (text left, image right) or centered on mobile
- 3–4 sentences of filler about Chris and the workshop <!-- TODO: owner to update -->
- CTA: "More About Us"

**Instagram teaser**
- Simple row: "@GreenCustomsGuitars on Instagram" with the Instagram icon
- Links to https://instagram.com/GreenCustomsGuitars
- No embed required — just a styled link/button

---

### About (`src/about.njk`)
- Page hero: heading "About Green Customs" on `--color-dark` background
- 3–4 paragraphs of filler about Chris, his background as a player, why he started the business <!-- TODO: owner to update -->
- 4 service cards linking to each area page (same style as home services strip but lighter bg)

---

### Repair & Restoration (`src/repairs.njk`)
- **Hero image:** `IMG_1585.jpeg` (acoustic guitar) — full-width with overlay
- Heading: "Repair & Restoration"
- Content sections (filler, owner to update):
  - What we do (fret work, setups, crack repair, electronics, etc.)
  - What to expect (turnaround time, how to get started)
  - Pricing note (filler: "Every instrument is different — get a quote")
- **CTA button:** "Request a Service" → `/service-request/`

---

### Electric Rebuilds (`src/rebuilds.njk`)
- Hero: use `IMG_1584.jpeg` (the Tele)
- Heading: "Electric Rebuilds"
- Content (filler, owner to update):
  - The concept: import guitars with great bones but weak electronics/hardware
  - What gets replaced: electronics (pots, switch, jack, wiring), pickups (often Side Quest hand-wounds), tuners, saddles, nut
  - The result: near-US build quality for less than the cost of a Mexican-built equivalent
  - Available as a service (bring your guitar) OR buy a completed rebuild from the shop
- **CTAs:** "See Available Rebuilds" → shop filtered to rebuilt-electrics | "Get a Rebuild Quote" → `/service-request/`

---

### Side Quest Pickups (`src/pickups.njk`)
- Hero: use `IMG_1586.jpeg` (the pickup set)
- Heading: "Side Quest Pickups" — style the "Side Quest Pickups" name prominently as the sub-brand (Playfair Display italic, large)
- Content (filler, owner to update):
  - Hand-wound in the workshop, one at a time
  - Available styles (singles, humbuckers, P-90 style) — filler list
  - Also does pickup repair and rewinding
- **CTAs:** "Browse Pickups" → shop filtered to side-quest-pickups | "Pickup Repair" → `/service-request/`

---

### Acoustic Builds (`src/acoustics.njk`)
- Heading: "Acoustic Builds"
- "Coming Soon" / "Just Getting Started" framing — this is new territory
- Content (filler):
  - Chris is beginning to hand-build acoustic guitars
  - First builds underway, contact to express interest or get on a list
- **CTA:** "Get in Touch" → `/contact/`
- No product listings for this category yet — placeholder message

---

### Shop (`src/shop.njk`)
- Page heading: "Shop"
- **Category filter tabs:** All | Rebuilt Electrics | Side Quest Pickups | Acoustic Guitars
  - Tabs filter visible product cards (JS `classList` toggle, no page reload)
  - "Acoustic Guitars" tab shows a "coming soon" message instead of products
- Product grid: 3 columns desktop, 2 columns tablet, 1 column mobile
- Each product card:
  - Image (4:3, object-fit cover)
  - Category tag (styled pill, `--color-olive` bg)
  - Title
  - Price (in CAD, styled prominently)
  - "Available" badge (green) or "Sold" badge (taupe/dimmed)
  - "View Details" → individual product page

Product pages are generated by Eleventy from `src/content/products/*.md`.
Create a product layout template at `src/_includes/product-page.njk`.

**Individual product page layout:**
- Large hero image
- Title + price
- Category
- Full description (markdown rendered)
- **Purchase section:**
  - Heading: "How to Buy"
  - PayPal button: links to `https://paypal.me/HANDLE` <!-- TODO: owner to fill in PayPal.me handle -->
  - Interac section: "Canadian? Send an Interac e-Transfer to erikas.boy@gmail.com — include the item name in the message."
  - "Questions?" → `/contact/`

---

### Service Request (`src/service-request.njk`)
- Heading: "Request a Service"
- Brief intro: "Fill out the form below and Chris will get back to you within 1–2 business days." <!-- TODO: adjust -->
- **Form** (Netlify form — add `netlify` and `name="service-request"` attributes to `<form>`):
  - Name (text, required)
  - Email (email, required)
  - Phone (tel, optional)
  - Service Type (select, required):
    - Repair or Restoration
    - Pickup Repair / Rewind
    - Electric Rebuild Quote
    - Other
  - Instrument — Brand (text)
  - Instrument — Model (text)
  - Instrument — Approximate Year (text)
  - Description of work needed (textarea, required)
  - How did you hear about us? (text, optional)
  - Submit button: "Send Request"
- After submit: Netlify shows a success page (add `action="/thank-you/"` and create a simple `thank-you.njk`)

---

### Contact (`src/contact.njk`)
- Heading: "Get in Touch"
- **Contact form** (Netlify form, `name="contact"`):
  - Name (required)
  - Email (required)
  - Message (textarea, required)
  - Submit: "Send Message"
- **Social / other contact info section:**
  - Instagram: @GreenCustomsGuitars → https://instagram.com/GreenCustomsGuitars
  - Instagram: @ChrisSchryer → https://instagram.com/ChrisSchryer
  - Email: erikas.boy@gmail.com

---

## Product Content — 3 Dummy Listings

### `src/content/products/creston-tele-rebuild.md`
```markdown
---
title: "Creston Telecaster — Full Rebuild"
category: "rebuilt-electrics"
price: "$349 CAD"
available: true
featured: true
image: "/images/IMG_1584.jpeg"
excerpt: "Import Tele body, fully rebuilt with a hand-wired harness and Side Quest single coils."
---

This Creston import Tele came in rough around the edges and left with a new identity. Full electronics overhaul: CTS pots, Switchcraft 3-way, Gavitt cloth-wire harness, and a pair of hand-wound single coils by Side Quest Pickups. Hardware refreshed with new saddles, tuners, and strap buttons. Finished with a fret level and polish, set up for low action with medium-gauge strings.

Plays and sounds like a working musician's guitar. Natural finish body, maple neck, red pearloid guard. Ready to gig.

<!-- TODO: owner to update specs/pricing -->
```

### `src/content/products/sqp-strat-set.md`
```markdown
---
title: "SSS Strat Set — Vintage Voiced"
category: "side-quest-pickups"
price: "$185 CAD"
available: true
featured: true
image: "/images/IMG_1586.jpeg"
excerpt: "Hand-wound Strat-style set, RWRP middle, alnico 5, wound to vintage specs."
---

Hand-wound one set at a time in the workshop. Neck and middle are RWRP for hum-cancelling in positions 2 and 4. Alnico 5 rod magnets, plain enamel wire, staggered pole pieces for standard vintage radius.

These are working-player pickups: clear and glassy up top with a full low end that doesn't get muddy. Fits any standard Strat-style pickguard. Prewired leads included.

<!-- TODO: owner to update specs/pricing -->
```

### `src/content/products/sqp-sq90.md`
```markdown
---
title: "SQ-90 — P-Style Single Coil"
category: "side-quest-pickups"
price: "$89 CAD"
available: true
featured: true
image: "/images/IMG_1587.jpeg"
excerpt: "A P-90 in spirit, wound in-house. Fits a humbucker route with a cover."
---

A P-90 in spirit, wound in-house by Side Quest Pickups. Sized to drop into a standard humbucker cavity with a dog-ear or soapbar cover, or use as-is. Alnico 5, heavy Formvar wire, wound to approximately 9.2k for some grit and growl.

Pair with a single volume and tone and you're done — no frills, no nonsense. Killer for blues, rock, or anything that needs a pickup with character.

<!-- TODO: owner to update specs/pricing -->
```

---

## Eleventy Config (`.eleventy.js`)

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");

  // Make products collection available globally
  eleventyConfig.addCollection("products", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/products/*.md")
      .sort((a, b) => (a.data.title > b.data.title ? 1 : -1));
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
```

---

## Netlify Config (`netlify.toml`)

```toml
[build]
  command = "npx @11ty/eleventy"
  publish = "_site"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/admin"
  to = "/admin/index.html"
  status = 200
```

---

## Decap CMS (`src/admin/config.yml`)

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "public/images"
public_folder: "/images"

collections:
  - name: "products"
    label: "Products"
    folder: "src/content/products"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - label: "Category"
        name: "category"
        widget: "select"
        options:
          - { label: "Rebuilt Electrics", value: "rebuilt-electrics" }
          - { label: "Side Quest Pickups", value: "side-quest-pickups" }
          - { label: "Acoustic Guitars", value: "acoustic-guitars" }
      - { label: "Price (e.g. $349 CAD)", name: "price", widget: "string" }
      - { label: "Available for Sale", name: "available", widget: "boolean", default: true }
      - { label: "Featured on Homepage", name: "featured", widget: "boolean", default: false }
      - { label: "Product Image", name: "image", widget: "image" }
      - { label: "Short Description (for cards)", name: "excerpt", widget: "string" }
      - { label: "Full Description", name: "body", widget: "markdown" }
```

### Decap CMS entry point (`src/admin/index.html`)
```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager — Green Customs</title>
</head>
<body>
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>
```

---

## Global Site Data (`src/_data/site.json`)

```json
{
  "name": "Green Customs",
  "tagline": "Custom guitar work from a player's perspective.",
  "email": "erikas.boy@gmail.com",
  "paypal": "paypal.me/HANDLE",
  "instagram_business": "GreenCustomsGuitars",
  "instagram_personal": "ChrisSchryer",
  "instagram_url": "https://instagram.com/GreenCustomsGuitars"
}
```

---

## CSS Architecture Notes

Use a single `src/assets/css/style.css`. Structure it as:

1. CSS custom properties (`:root` block — all colors, fonts, spacing)
2. Reset / base (box-sizing, margins, body)
3. Typography
4. Layout utilities (container, grid helpers)
5. Header + desktop nav
6. Mobile bottom tab bar
7. Hero sections
8. Product cards
9. Product grid + shop filters
10. Forms (service request + contact)
11. Footer
12. Page-specific overrides (repairs, pickups, etc.)
13. Responsive breakpoints at end (`@media` blocks)

**Key CSS patterns to use:**
- `scroll-snap-type: x mandatory` on carousel container + `scroll-snap-align: start` on items
- `position: fixed; bottom: 0; left: 0; right: 0` for mobile tab bar
- `clamp()` for fluid typography: e.g. `font-size: clamp(1.5rem, 4vw, 3rem)`
- CSS Grid for product grid: `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`
- `aspect-ratio: 4/3` on product card images
- `object-fit: cover` on all `<img>` in cards

---

## JS Notes (`src/assets/js/main.js`)

Keep it minimal:

1. **Shop category filter** — toggle `data-category` visibility on click of filter tabs
2. **Mobile menu** — if keeping a hamburger fallback for tablet, toggle a class on `<body>`
3. **Scroll-based header** — add a `.scrolled` class to header after 50px scroll (for subtle shadow)
4. No libraries, no jQuery, no frameworks

---

## Responsive Breakpoints

```css
/* Mobile first — base styles are mobile */
/* Tablet */
@media (min-width: 640px) { }
/* Desktop */
@media (min-width: 1024px) { }
/* Wide */
@media (min-width: 1280px) { }
```

**Mobile specifics:**
- Bottom tab bar visible, top nav links hidden
- Hero text smaller (use `clamp()`)
- Product cards: 1-column
- Forms: full width inputs
- Add `padding-bottom: calc(56px + env(safe-area-inset-bottom))` to `<main>` to avoid content hiding behind tab bar

**Desktop specifics:**
- Bottom tab bar hidden (`display: none`)
- Top nav links visible
- Product cards: 3-column grid
- Hero: can be taller, larger type

---

## Deployment Checklist (for when ready — not needed to build)

1. Init git repo, push to GitHub
2. Create Netlify account → "Add new site" → "Import from Git"
3. Build command: `npx @11ty/eleventy`, publish dir: `_site`
4. Netlify → Site settings → Identity → Enable
5. Identity → Services → Git Gateway → Enable
6. Update `src/admin/config.yml` `backend.repo` if using GitHub backend directly (not needed with git-gateway)
7. Deploy → visit `yoursite.netlify.app/admin` → Sign up → confirm email
8. Point custom domain in Netlify DNS settings

---

## File Copy Task (do this before building templates)

Copy the source images into the right place:
- `Green Customs Logo.png` → `public/images/green-customs-logo.png`
- `images/IMG_1584.jpeg` → `public/images/IMG_1584.jpeg`
- `images/IMG_1585.jpeg` → `public/images/IMG_1585.jpeg`
- `images/IMG_1586.jpeg` → `public/images/IMG_1586.jpeg`
- `images/IMG_1587.jpeg` → `public/images/IMG_1587.jpeg`

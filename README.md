# LeanForLess

An original, responsive recipe website prototype built around **High Protein. Low Cost.** Built with Vite, vanilla JavaScript, and CSS; no backend or credentials required.

## Run locally

Requires Node.js 20.19+ or 22.12+ (tested with Node 24).

```sh
npm ci
npm run dev
```

Open the local address printed by Vite (normally http://localhost:5173). In this cloud workspace, use `npm ci --cache /tmp/leanforless-npm` if the default npm cache is not writable.

```sh
npm run build       # Production bundle in dist/
npm run preview     # Serve the production build locally
npm test            # Playwright browser checks
```

Browser tests use `/usr/bin/chromium` by default. On another machine, install Chromium and set `CHROMIUM_PATH` to its executable path. The test runner starts Vite if necessary.

## Pages and interactions

- `/` — Homepage, featured recipes, five category links, cost methodology.
- `/recipes?filter=under-150` — Under $1.50 High-Protein Meals, with search and sorting.
- Other filters: `under-1`, `high-protein`, `quick`, and `meal-prep`.
- `/recipes/lemon-chicken-rice-bowls` — Full individual recipe, cost breakdown, nutrition estimates, and Recipe JSON-LD.
- Three additional complete recipe pages: `cozy-red-lentil-bowls`, `tuna-white-bean-salad`, and `creamy-spinach-bean-pasta` under `/recipes/`.
- Save/unsave recipes in browser localStorage; view them in a keyboard-accessible native dialog.
- Scale ingredient quantities and costs from 2–12 servings, check off ingredients, jump to instructions, and print.

All implemented navigation stays within existing pages. Unknown paths show a recovery page. Production hosting must rewrite application routes to `index.html` (Vite dev and preview already do this).

## Reusable structure

- `src/recipes.js` — Recipe records, categories, and filter predicates. Add records to extend the shared recipe cards and detail pages.
- `src/main.js` — Shared header, footer, cards, category page, recipe template, JSON-LD, and interaction handlers.
- `src/style.css` — Design tokens, components, mobile/tablet/desktop layouts, focus states, reduced-motion and print styles.
- `public/images/food-grid.webp` — Locally stored, generated illustrative food photography, optimized to WebP. CSS selects individual dish regions.
- `public/favicon.svg` — Original leaf mark.
- `index.html`, `package.json`, `package-lock.json` — Application entry and reproducible dependencies.
- `playwright.config.js`, `tests/site.spec.js` — Browser checks.

Fonts are self-hosted from the Fontsource packages. The site makes no third-party runtime requests.

## Validation

11 Playwright tests cover the homepage → category → recipe → breadcrumb flow; all category filters; search and empty state; price/protein/time sorting; saved-recipe persistence and removal; ingredient checklists; serving-size calculations; ingredient cost totals; structured data; link and local fragment validity; mobile navigation; image loading; and horizontal overflow at **320, 375, 390, 768, 1024, and 1440px**. Desktop and mobile screenshots are generated in `test-results/`. Production build is also checked.

## Prototype boundaries

All ingredient prices are invented illustrative USD estimates, not live supermarket data. Nutrition values are illustrative, not calculated or professionally verified. Recipes and generated serving images are demo content and have not been kitchen-tested. Some images include optional garnish. Package purchases, taxes, energy, and equipment are excluded from prices; this is stated on the site.

Saved recipes live only in the current browser. There are no accounts, cloud sync, CMS, live pricing, analytics, or backend. Recipe schema is generated client-side; production SEO should use prerendering or server rendering, unique social metadata, a canonical domain, a sitemap, and validated recipe-specific image assets. A larger catalog should add pagination and indexed search.

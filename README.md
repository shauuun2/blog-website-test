# LeanForLess — a fully static recipe website

**High Protein. Low Cost.** An original, responsive recipe prototype made with standard HTML, CSS, and vanilla JavaScript.

## Open the website

1. Download the repository as a ZIP and **extract the whole folder**.
2. Double-click **index.html** to open it in your browser.
3. Use the navigation normally. Every page links to a real `.html` file.

This works with a local `file://` address, including Windows folders with spaces or non-ASCII characters. Keep the `assets` and `recipes` folders alongside `index.html` when copying the site. Do not open HTML files from inside an unextracted ZIP.

**No Node.js, npm, Vite, installation, local server, network connection, or build step is needed.** There are no module scripts, fetch requests, external CDN resources, or server routes. Fonts, food images, and the favicon are included. Modern Chrome, Edge, Firefox, and Safari support the standard features used here; managed browser policies can independently prohibit local files or scripts.

The same files can optionally be uploaded unchanged to any ordinary static web host. No route rewrites are required. The old extensionless Vite routes are replaced by the file paths below.

## Pages

| File | Content |
| --- | --- |
| `index.html` | Homepage, featured recipes, categories, price methodology |
| `recipes.html` | Under $1.50 High-Protein Meals |
| `under-1.html` | Under $1 meals |
| `40g-protein.html` | 40g+ Protein |
| `20-minute-meals.html` | 20-Minute Meals |
| `meal-prep.html` | Meal Prep |
| `recipes/lemon-chicken-rice-bowls.html` | Complete lemon chicken recipe |
| `recipes/cozy-red-lentil-bowls.html` | Complete red lentil recipe |
| `recipes/tuna-white-bean-salad.html` | Complete tuna and bean recipe |
| `recipes/creamy-spinach-bean-pasta.html` | Complete spinach and bean pasta recipe |

Every HTML file contains its actual page content, unique title and description, breadcrumbs where appropriate, and relative navigation. Recipe pages include ingredients, steps, nutrition, cost breakdowns, and Recipe JSON-LD in their original HTML. Reading recipes and following links still works with JavaScript disabled. Search, sorting, saved recipes, serving controls, mobile menu toggling, and the print button need browser JavaScript enabled.

## Features retained

- Original cream, forest-green, and terracotta design, local food imagery, and variable fonts.
- Mobile, tablet, and desktop layouts, keyboard focus, reduced motion, skip links, and print styles.
- Five category pages, ingredient/title search, sorting, and a recoverable empty state.
- Save/unsave recipe hearts and a keyboard-accessible recipe-box dialog.
- Ingredient checklists, 2–12 serving scaling, recalculated quantities/costs, and adjusted serving references in instructions.
- Per-serving nutrition estimates, ingredient cost tables, transparent pricing methodology, related recipes, and structured recipe data.

Browser storage for `file://` pages varies between browsers. Saved recipes use localStorage when available, plus a tab-local fallback to carry selections while navigating local pages in the same tab. If persistence is restricted, recipes can still be saved for the current page visit. Cross-browser/device synchronization is not provided. Ingredient checks and serving changes are local to the current recipe visit.

## Maintain the site without a build

- Edit the `.html` files directly for page content, navigation, and SEO. They are the complete deliverable, not generated artifacts that need rebuilding.
- `assets/css/style.css` holds the shared design and responsive/print rules.
- `assets/js/recipes.js` holds the shared recipe records and filter definitions used by interactive search and scaling. It is a normal classic script, not an ES module.
- `assets/js/site.js` holds reusable recipe-card markup and progressive interaction handlers. It enhances existing HTML instead of rendering the whole site.
- `assets/images/food-grid.webp` is the original generated food image; CSS selects each dish's region.
- `assets/fonts/` contains the original Latin variable-font files and their SIL Open Font Licenses.
- `assets/favicon.svg` is the original leaf mark.

When changing recipe content, update both its static HTML (including JSON-LD) and its record in `assets/js/recipes.js`, so the no-JavaScript page and interactive quantities/search agree. A new recipe can use an existing recipe HTML file as a template, with a new slug and data record. No build step is involved.

All site paths use relative forward-slash URLs. Top-level pages use `./`, and recipe pages use `../` for shared assets and links. Avoid filesystem-root URLs such as `/assets/...`, backslashes, machine-specific drive letters, and JavaScript imports/fetches, which can fail when opened locally.

## Validation

The optional contributor browser suite in `tests/` opens **real `file://` URLs**, without a web server. It checks navigation, all category filters, search/sorting, saved-recipe persistence/removal, serving calculations, checklists, ingredient totals, original-HTML structured data, every page's links/assets/fragment targets, no-JavaScript content, restricted-storage fallback, and a copied standalone folder whose name contains spaces and non-ASCII characters and which contains no dependencies.

Responsive checks cover **320, 375, 390, 768, 1024, and 1440px**, including image loading, mobile navigation, and horizontal overflow. Test tooling is optional and is never loaded or needed by the website. See `tests/README.md` for contributor instructions.

## Prototype boundaries

Prices are invented illustrative USD estimates, not live supermarket data. Nutrition is illustrative, not professionally verified. Recipes and generated serving images are demo content and have not been kitchen-tested; some images include optional garnish. Prices count quantities used, excluding full-package purchases, tax, energy, and equipment, as explained on the site.

There are no accounts, CMS, live prices, analytics, or backend. Saved recipes remain browser/tab-local. Recipe schema retains illustrative estimates and relative image/step URLs; a future published site can add a real canonical domain, social metadata, and a sitemap. A larger catalog can add pagination and indexed search.

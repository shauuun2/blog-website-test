# Optional contributor browser tests

These tests are separate developer tooling, **not a website dependency**. To view or use LeanForLess, just open `index.html`. Nothing in this directory runs as part of the site.

For contributors with Playwright Test already installed and resolvable by Node, run its CLI from the project folder:

```sh
playwright test --config tests/playwright.config.cjs --workers=2
```

Use the full path to an existing Playwright CLI if it is not on PATH. The suite uses the Playwright-managed Chromium by default. Set `CHROMIUM_PATH` to an already-installed Chromium/Chrome executable to test that browser instead. No development server or build is used.

All navigation is through local `file://` URLs. The tests also copy only the actual website files into a temporary directory with spaces and an accented character in its name. No `node_modules`, package manifest, or build output is copied. A separate test disables JavaScript to verify that essential content and schema are in the HTML.

The suite is platform-neutral: Node's `pathToFileURL` handles Windows drive letters and URL escaping. Chromium's `--no-sandbox` launch argument supports this isolated Linux cloud test environment; ordinary desktop browsers do not need it to open the website.

Screenshots and reports go into ignored `test-results/`. Local browser enterprise policies that deny `file://` navigation can prevent the test browser from opening files; do not change the website or browser security settings to compensate. Use a normal browser installation that permits opening local website files.

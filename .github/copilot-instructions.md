## Purpose

This project is a small static marketing site (single-page HTML/CSS/JS). These notes help AI coding agents quickly become productive by describing the project's structure, discoverable patterns, and a few gotchas to avoid.

## High-level architecture

- Root files: `index.html`, `styles.css`, `scripts.js`. No build system or package manager detected.
- index.html is the single entry point. It links `styles.css` and (intended) client script. The site is served as static files.

## Important patterns & examples

- DOM/UX patterns: the footer year is set dynamically:
  - `scripts.js`: document.getElementById("year").textContent = new Date().getFullYear();
- Payment flow: PayPal Buttons are rendered from `scripts.js` using a `getAmount()` helper and `paypal.Buttons({...}).render(...)`.
  - `scripts.js` contains createOrder/onApprove/onError handlers and expects a container selector `#paypal-button-container`.
  - `index.html` includes the PayPal SDK script tag with a client-id query param (currently a test/placeholder client id).

## Repo-specific gotchas (do not change without confirming behavior)

- Script filename mismatch: `index.html` references `script.js` (singular) but the actual file is `scripts.js` (plural). Agents should not rename files blindly—either update the HTML reference or ensure the script filename is consistent and test in a browser.
- PayPal container id mismatch: `scripts.js` renders into `#paypal-button-container`, but `index.html` currently has a div with id that looks like a URL rather than the expected `paypal-button-container`. Fixes must preserve PayPal security considerations and client-id usage.

## Developer workflows

- No build step. To preview locally, open `index.html` in a browser or serve the folder with a static server (examples):
  - `python3 -m http.server 8000` (browse http://localhost:8000)
  - `npx serve .` (if node/npm is available)
- Tests: none detected. Keep changes small and verify in a browser. For JS changes, open DevTools console to inspect runtime errors (e.g., missing DOM elements or PayPal SDK not loaded).

## Conventions and style

- Keep styles in `styles.css` and plain DOM-manipulating code in `scripts.js`.
- Minimal, dependency-free JS. Avoid adding heavy frameworks unless project is intentionally re-architected.

## Integration points & external dependencies

- PayPal SDK: included via script tag in `index.html`. Any modifications to client-id or SDK usage should be validated with a sandbox/test account before going live.

## How to make safe changes

1. Reproduce locally by serving the site and opening the page in a browser.
2. If changing the PayPal flow, confirm the SDK script load and the container id match the `.render()` target in `scripts.js`.
3. Preserve the public-facing HTML structure (sections with `.section`, `.container`) to avoid layout regressions.

## Quick pointers for agents

- When editing JS, reference `scripts.js` for event patterns (getElementById, alert-based error handling). Example: `getAmount()` reads `#amountPreset` and `#amountCustom`.
- If you add files, update `index.html` references and verify by serving the site.

---
If any of the above is unclear or you'd like the file to be stricter/looser in rules (for example, allow introducing a bundler or tests), tell me which approach you'd prefer and I will update this file.

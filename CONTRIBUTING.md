# Contributing to Kinetic

Thanks for helping make Kinetic a stronger open-source editor.

## How to run locally

```bash
git clone https://github.com/103softwaresolutionsllc-rgb/kinetic-open-source-video-editor.git
cd kinetic-open-source-video-editor
npm install
npm run dev
```

Open the printed local URL. FFmpeg.wasm needs the COOP/COEP headers already set in `vite.config.js`.

## Pull requests

1. Branch from `main`.
2. Keep changes focused (one feature or fix per PR when possible).
3. Do not add server-side uploads, analytics that send media, or shared project storage.
4. Run `npm run build` before you open the PR.

## Product rules that should stay true

- Editing and export stay in the browser.
- A visitor’s clips must not be visible to the next visitor.
- Header menus should open on click (not hover) so they work on desktop and touch.

## Questions

Open a GitHub issue on this repository.

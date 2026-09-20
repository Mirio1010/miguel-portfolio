# React + Vite

## Notes feature

Run `npm install` and `npm run dev`, then use **Notes** in the existing navbar.
`npm run build`, `npm run lint`, and `npm test` verify the production build, code,
and bounded page-window/layout calculations. No routes or backend are needed.

### Adding real notebooks

Edit **`src/data/notes.js`**. Replace each notebook's `pdfUrl: developmentPreview`
with its public HTTPS PDF URL, for example:

```js
{
  id: "react", // stable, unique identifier
  title: "React",
  description: "My handwritten React notes.",
  category: "Interfaces",
  year: 2026, // optional
  pageCount: 120, // optional cover label; reader uses the actual PDF count
  pdfUrl: "https://YOUR-PROJECT.supabase.co/storage/v1/object/public/notes/react.pdf",
}
```

The included subject descriptions are starter copy. The existing resume PDF is
used only in development, with a visible preview label. Production entries with
no real URL show an unavailable message. No new PDFs are included in this feature;
keep notebooks in your external object storage, not this repository or `public/`.

The public URL must return a PDF, not a login page. Enable CORS for your portfolio
origin on the storage host. For large-file range loading, support byte-range
requests (`Accept-Ranges: bytes`, `206 Partial Content`, `Content-Range`) and expose
`Accept-Ranges`, `Content-Length`, and `Content-Range` through CORS. Without range
support, PDF.js may need to download the whole file after opening; the canvas
limit still applies. No credentials, database, or Supabase SDK are used.

### Reader architecture

- `NotesSection` owns the selected notebook; `NotebookViewer` is a native modal
  dialog with Escape handling, focus containment/restoration, and scroll locking.
- `NotebookReader` is a lazy chunk containing `react-pdf`, `react-pageflip`, and
  the PDF worker configuration. No PDF or worker is requested on initial load.
- Page-flip needs one lightweight HTML shell per page. Only the visible page(s)
  and two neighbors in each direction mount `react-pdf` pages: at most six PDF
  canvases (five on mobile), plus a temporary canvas copy during a portrait turn.
  Distant canvases unmount and their PDF page resources are cleaned up. Pixel
  density is capped at 1.5 to bound backing-buffer memory on high-DPI phones.
- PDF.js automatic fetching/streaming is disabled to use demand-driven range
  loading where the server supports it. Closing unmounts the document/worker.
- At 760px of available reader width, the layout changes from one page to two.
  Resizing rebuilds the book around the current page. Mixed page sizes are fitted
  within the book without changing aspect ratios or cropping PDF content.
- Arrows, buttons, and dragging/swiping turn pages. The original PDF link offers
  browser zoom and access to any text/accessibility data in the source document;
  handwritten scans themselves still require an accessible source alternative.

`scripts/patch-page-flip.mjs` runs after installation. It fixes two issues in the
upstream `page-flip` 2.0.7 dependency: its animation loop survives `destroy()`, and
portrait DOM clones lose canvas pixels. The script is idempotent and fails clearly
if an upgrade changes the relevant upstream code. The reader separately calls
`destroy()` because react-pageflip's wrapper has no unmount cleanup. If installing
with `--ignore-scripts`, run `node scripts/patch-page-flip.mjs` before starting Vite.

Browser verification used a temporary 301-page PDF, including mixed page sizes,
to check sustained page turning and the six-canvas bound. The fixture is not
included. Real 30–50 MB scans and your eventual CDN still need a final check once
you have those URLs, especially CORS and range-response behavior.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

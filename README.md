# NeuralKinetics — Hero Landing Page

Full-screen hero section built with React 19, Vite, and Framer Motion (`motion` package).

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Structure

- `index.html` — loads Inter (300/400/500/600) from Google Fonts
- `src/App.jsx` — Navbar, Footer components + inline SVG icons
- `src/App.css` — all layout/styling, mobile-first with a 768px breakpoint
- `src/index.css` — global reset + reduced-motion support

## Notes

- All entrance animations use `ease: [0.16, 1, 0.3, 1]` per the brief, staggered by delay.

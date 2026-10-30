# Colton Morrill portfolio

Personal portfolio built with Next.js Pages Router, React, TypeScript, Tailwind CSS, GSAP, and Three.js.

## Development

```sh
npm ci
npm run dev
```

Open http://localhost:3000. On Windows PowerShell use `npm.cmd` if execution policy blocks `npm`.

## Verification

```sh
npm run lint
npm run build
node --experimental-strip-types tests/project-logo-geometry.mjs
npm run start -- -p 3101
```

With the production server running, use another terminal:

```sh
node tests/featured-project.integration.mjs
```

Browser checks use a headless Chromium instance with remote debugging on port 9223:

```sh
node tests/project-layout.browser.mjs
node tests/remaining-projects.browser.mjs
node tests/project-gallery.browser.mjs
```

All checks default to http://localhost:3101. Set `PORTFOLIO_TEST_ORIGIN` to test another server. Run the gallery check against the development server too: it covers the React Strict Mode dialog lifecycle. Set `PORTFOLIO_TEST_MOTION=normal` to exercise normal motion; the default gallery check uses reduced motion. Browser screenshots go into the ignored `.next/` directory.

The build checks TypeScript. Node 22 may print warnings for experimental TypeScript stripping in the geometry test. Fonts use `next/font/google`; a fresh build may need network access.

## Editing

The homepage is `pages/index.tsx`, sections are in `components/home/`, and project content is in `data/portfolio.ts`. Shared metadata is in `data/site.ts`. Fonts and analytics are in `pages/_app.tsx`, global styles in `styles/globals.css`, and scroll motion in `hooks/useHomePageAnimations.ts`.

- [Featured project implementation](docs/featured-project.md): cards, logos, screenshot galleries, and assets.
- [Contributor guide](docs/agent-guide.md): source ownership and verification expectations.

Older components remain in the repository; follow imports from the homepage before editing. Deployment follows the repository's existing hosting setup.

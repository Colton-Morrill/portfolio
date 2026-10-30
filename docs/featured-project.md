# Featured projects

The homepage features Fund Launch AI, Press Sports, Vibility LMS, and AptoGenix, ordered by `ProjectCaseStudy.featured.order` in `data/portfolio.ts`.

## Components

- `FeaturedProject.tsx` renders each glass card, highlights, contribution, technology tags, site link, and gallery trigger. Desktop sections alternate the card and logo; tablet and phone sections stack them with a clear gap.
- `ProjectLogo.tsx` renders a Three.js extruded logo with a restrained animated glow. Each logo occupies the same square stage. The camera fits and centers its actual bounds; original proportions remain intact. Static SVG fallbacks work without WebGL.
- `useFeaturedProjectReveal.ts` coordinates scroll reveals, short phone intros, reduced motion, and rendering failures. The renderer pauses when hidden or outside the viewport and disposes its resources on unmount.
- `ProjectGallery.tsx` opens a native modal dialog with multiple screenshots, thumbnail selection, arrow-key navigation, detail view, and original-image links. It locks background scrolling and restores focus on close. Its close handler ignores stale cleanup events from React Strict Mode.
- `RemainingProjects.tsx` combines the other case studies and smaller projects into one compact list. Internal projects remain non-link entries.

Scoped styles live in `styles/FeaturedProject.module.css`, `styles/ProjectGallery.module.css`, and `styles/RemainingProjects.module.css`. Card lighting faces the logo and comes from above in stacked layouts. Backgrounds have no workspace grid.

## Content and assets

`featured` holds identity, colors, contribution, three highlights, outcome, preview fallback, and labeled screenshot records. `screens[].crop` is an SVG viewBox used to display the visible part of older 1000px presentation images. Filenames are URL-encoded when shown or opened from the gallery.

Fund Launch includes both light and dark pitch deck screenshots. Existing screenshots stay under `public/fl/` or the root of `public/`. New logo assets live under `public/projects/`.

`lib/projectLogoGeometry.ts` preserves solid logo bodies and contour holes. Each featured identity needs `<id>-contours.json`, `<id>-distance.png`, and `<id>-mark.svg` under `public/projects/`. Keep all three files together.

Rebuild logo assets with the existing generator:

```sh
node scripts/generate-fund-launch-assets.cjs
node scripts/generate-fund-launch-assets.cjs --press-sports
node scripts/generate-fund-launch-assets.cjs --vibility
node scripts/generate-fund-launch-assets.cjs --aptogenix
```

Its source assets are `public/fundlaunchicon.svg`, `public/Press-Sports-Favicon.png`, `public/icon.png`, and `public/aptogenix.png`. AptoGenix's teal is the portfolio treatment. `public/projects/sicoustics-logo.png` is the official white logo downloaded from https://sicoustics.com/logo-sicoustics-white.png; CSS frames its symbol in the condensed row. `wellness-mark.svg` recreates the leaf mark visible in the existing My Wellness Curriculum screenshots.

## Verification

See the README for commands. Keep the integration, gallery, layout, compact-list, and geometry checks with this implementation. The gallery browser check must pass on both development and production servers. The integration check also ensures retired experimental routes and assets stay unavailable.

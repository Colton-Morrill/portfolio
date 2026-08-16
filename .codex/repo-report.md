# Portfolio Repo Report

Last reviewed: 2026-08-16

## Project Shape

- Personal portfolio for Colton Morrill, implemented as a Pages Router Next.js app.
- Main route is `pages/index.tsx`; it renders a single-page portfolio with navbar, hero, projects, about, experience, and contact sections.
- Most portfolio content lives in `data/portfolio.ts`; site metadata lives in `data/site.ts`.
- Styling is mostly Tailwind utility classes in components, plus global animation/glass helpers in `styles/globals.css`.
- The project uses strict TypeScript, path alias `@/*`, React 19, Next 16, Tailwind 3, GSAP, Headless UI, Font Awesome, lucide-react, and Vercel Analytics.

## Commands

- Install: `npm install`
- Dev server: `npm run dev`
- Production build: `npm.cmd run build` on this Windows workspace
- Lint: `npm run lint`

## Current App Flow

`pages/index.tsx`:

- Imports metadata from `data/site.ts`.
- Imports content arrays from `data/portfolio.ts`.
- Calls `useHomePageAnimations()` once at page level.
- Renders:
  - `Navbar`
  - `HeroSection`
  - `ProjectsSection`
  - `AboutSection`
  - `ExperienceSection`
  - contact wrapper + `ContactSection`
- Anchor spacer divs use ids `projects`, `about-me`, and `experience`; contact id is inside `ContactSection`.

## Data Model

`data/portfolio.ts` is the primary content source.

- `heroGradientStyles`: CSS custom-property objects used by hero gradient text.
- `projectCaseStudies`: current main project section data.
- `projectArchive`: smaller "Extra Work" cards.
- `experienceItems`: timeline content for experience cards.
- `aboutStackIcons`: Font Awesome icon list for the about section.
- `featuredProjectRows` and `smallProjects`: older data structures that appear to support legacy components and are not used by `pages/index.tsx`.

When adding/editing portfolio work, prefer changing `projectCaseStudies` and `projectArchive` first. If a new project title needs custom visual treatment, update `getProjectPalette()` in `components/home/ProjectsSection.tsx`.

## Key Components

- `components/NavBar.tsx`: fixed glass navbar, Headless UI `Disclosure` for mobile menu, anchors into the single-page sections.
- `components/home/HeroSection.tsx`: full-screen visual hero using `HeroGeometric`; text animation classes are tied to GSAP selectors.
- `components/home/ProjectsSection.tsx`: largest component. Contains palette selection, gallery animation rules, Fund Launch-specific flip interaction, archive tiles, and the main project layout.
- `components/home/AboutSection.tsx`: marquee, portrait image, stack icons, bio text, education, outside-work link.
- `components/home/ExperienceSection.tsx`: section copy, animated year counter target, maps `experienceItems` into `ExperienceCard`.
- `components/home/ContactSection.tsx`: full-height contact card with animated particles, email, LinkedIn, GitHub, and copyright year placeholder.
- `components/home/SectionShell.tsx`: wraps content in the global `.section-shell` Tailwind component class.
- `lib/utils.ts`: `cn()` helper using `clsx` and `tailwind-merge`.

## Animation Notes

`hooks/useHomePageAnimations.ts` dynamically imports GSAP, ScrollTrigger, and SplitText on the client.

Important selectors:

- `#year`: replaced with current year.
- `#year-counter`: animates to `5`, with reduced-motion fallback.
- `.nav-load`, `.hero-eyebrow`, `.hero-subcopy`: load-in animation.
- `.text`, `.mobile-text1`, `.mobile-text2`, `.mobile-text3`: hero SplitText animation.
- `.section-title`, `.section-reveal`, `.section-media`, `.section-kicker`, `.section-copy`, `.timeline-card`: scroll reveals.
- `.about-marquee-track`: paused/resumed marquee animation.
- `.hero-content`, `.hero-wave-layer`, `.hero-fade-veil`: hero scroll fade/parallax.
- `.contact-card-shell`, `.contact-shell`, `.contact-reveal`: contact reveal.

Be careful renaming classes in JSX; several are animation hooks, not just styling.

## Styling Notes

- `styles/globals.css` includes a large inline SVG background on `body`, typography defaults, gradient text, SplitText support classes, contact keyframes, glass helper classes, and Tailwind component classes.
- `.section-shell` is defined in `@layer components` and reused through `SectionShell`.
- `styles/Home.module.css` mostly contains leftover create-next-app styles; `container` is currently used by `pages/index.tsx`, but most other classes appear unused.
- Design language: dark, polished, glassy, high-contrast portfolio with cyan/indigo/purple/green accents, gradient text, motion, and large editorial typography.

## Assets

`public/` contains many portfolio assets:

- Project screenshots and mockups: Press Sports, SiCoustics, AptoGenix, My Wellness Curriculum, Vibility, CleanRCans, Fund Launch, Vaporwave.
- Profile/brand imagery: `colton-cuttout.png`, `profile.jpg`, `headshot2025.jpg`, `cm-logo-01.svg`, etc.
- Videos exist but current main page appears image-driven.

Use `next/image` for new local images, matching the existing pattern.

## Known Cleanup Targets

- `README.md` still contains create-next-app instructions and references `pages/index.js` / `pages/api/hello.js`, while the app uses TypeScript.
- `data/json.js` appears to be placeholder/example data and is not imported by the current app.
- `pages/api/hello.ts` is likely the default sample API route unless intentionally used elsewhere.
- Legacy components/data likely unused by the current home page include `ProjectCard`, `ProjectCardSmall`, `Footer`, and the `featuredProjectRows` / `smallProjects` data.
- `ContactSection.tsx` appears to contain a mojibake copyright symbol; replace it with a clean copyright entity or plain ASCII-safe rendering.
- `ProjectsSectionProps` accepts `stats`, and `pages/index.tsx` passes it, but `ProjectsSection` does not currently render the value.

## Editing Guidelines For This Repo

- For content changes, start in `data/portfolio.ts` or `data/site.ts`.
- For layout/visual changes, edit the relevant section component under `components/home`.
- Avoid renaming animation selector classes unless `useHomePageAnimations.ts` is updated at the same time.
- Keep section anchors aligned with navbar links.
- Prefer existing Tailwind-heavy style and `SectionShell` rather than introducing new CSS modules.
- Check desktop and mobile because the hero and project galleries have separate responsive behavior.
- Run `npm.cmd run build` after non-trivial TypeScript or component changes.

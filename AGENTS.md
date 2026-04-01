# Portfolio Project Agent Guide

Project-specific instructions for agents working in this repository. Reusable framework guidance lives in `.agents/nextjs-general.md`.

## Project Context

- This is a personal portfolio built with the Pages Router in `pages/`.
- The app is mostly static, with animation-heavy presentation on the homepage.
- Tailwind is the primary styling layer, with a small amount of CSS modules and global CSS.

## Working Rules

- Keep the Pages Router unless the task explicitly asks for an App Router migration.
- Prefer incremental modernization over large structural rewrites.
- Preserve visual behavior unless the user asks for a redesign.
- Treat GSAP-based motion as intentional; change it only when required for compatibility or bugs.

## Content and Assets

- Keep portfolio assets in `public/`.
- Prefer updating existing content blocks over inventing new sections.
- Avoid deleting older project assets unless the user asks for cleanup.
- When the user references recent screenshots, use `C:\Users\Colton\Pictures\Screenshots` as the default visual-reference folder and check the newest files first.

## Upgrade Guidance

- For framework upgrades, keep the change set focused on compatibility first.
- Update linting scripts and configs when Next.js removes or deprecates built-in commands.
- Remove stale Next.js config flags when they no longer affect current versions.

## Verification

- Run `npm run lint` after dependency or config changes.
- Run `npm run build` before closing out upgrade work when dependencies are installable in the environment.

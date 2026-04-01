# Next.js General Agent Guide

This file is a reusable baseline for agents working in a modern Next.js codebase.

## Defaults

- Prefer current stable Next.js patterns over legacy examples.
- Keep `next`, `react`, `react-dom`, and `eslint-config-next` aligned on the same major version.
- Assume Next.js 16+ conventions unless the repo clearly requires otherwise.
- Use the existing router already present in the repo unless the task explicitly includes a router migration.

## Routing

- Respect the current router:
- `pages/` means Pages Router.
- `app/` means App Router.
- Do not introduce a mixed-router migration as incidental work.

## Data and Rendering

- Favor static rendering for portfolio and marketing content unless dynamic behavior is required.
- Keep client-side effects isolated to components that truly need browser APIs or animation libraries.
- Avoid moving content into API routes unless there is an actual runtime need.

## Performance

- Prefer `next/image` for local images that benefit from optimization.
- Keep large media in `public/` unless the repo already uses a CMS or remote image pipeline.
- Be conservative with animation libraries; preserve UX, but avoid unnecessary client JavaScript.

## Tooling

- In Next.js 16+, do not use `next lint`; use the ESLint CLI instead.
- Remove config options that are obsolete in current Next.js versions instead of preserving dead settings.
- Verify Node.js compatibility before upgrading Next.js.

## Scope Control

- Treat router migrations, major design rewrites, and content rewrites as separate tasks unless explicitly requested.
- For upgrades, prioritize dependency alignment, build compatibility, and minimal behavior change first.

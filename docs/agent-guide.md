# Contributor guide

Follow imports from `pages/index.tsx`; older similarly named components are not necessarily active.

| Change | Source |
| --- | --- |
| Project content, order, screenshots | `data/portfolio.ts` |
| Hero copy and heading | `components/home/HeroSection.tsx` |
| Featured sequence and compact list | `components/home/ProjectsSection.tsx`, `RemainingProjects.tsx` |
| Featured cards and screenshot dialog | `components/home/FeaturedProject.tsx`, `ProjectGallery.tsx` |
| Neon logos and contour geometry | `components/home/ProjectLogo.tsx`, `lib/projectLogoGeometry.ts` |
| Biography, experience, contact | Their section components in `components/home/` |
| Shared scroll motion and experience counter | `hooks/useHomePageAnimations.ts` |
| Section background fades and global appearance | `styles/globals.css` |
| Sharing metadata | `data/site.ts`, `pages/index.tsx` |

Preserve unrelated changes. Keep portfolio content factual and do not invent metrics, roles, or project availability. Preserve anchor IDs and animation selectors or update their consumers together. Keep cleanup for timers, listeners, and GPU resources.

The featured order is Fund Launch, Press Sports, Vibility, then AptoGenix. Use `featured.id` for logo assets. Keep all generated contour/distance/SVG assets and their generator source images. See [the implementation guide](featured-project.md).

Keep controls named and keyboard accessible. Verify galleries on development as well as production: native dialog close events are asynchronous, and React Strict Mode repeats effect setup/cleanup. Maintain focus restoration, Escape, background scroll locking, static logo fallbacks, and reduced motion.

Section background layers must reach zero opacity at their boundaries. Check the adjacent section too when investigating a seam. The experience counter must show 6 in both animated and reduced-motion paths.

Run `npm.cmd run lint`, `npm.cmd run build`, and the focused checks documented in the README. Run browser scripts sequentially because they share a remote debugging tab. Confirm assets exist, desktop/tablet/phone layouts fit, and galleries open from actual clicks. Keep screenshots in `.next/` or a temporary directory; do not commit browser profiles, build outputs, or design experiments.

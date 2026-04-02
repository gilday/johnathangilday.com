# johnathangilday.com

Personal website for Johnathan Gilday — landing page, blog, and resume.
Built with Astro 5 (static site generation, zero client-side JS).

## Commands

- `npm run dev` — start dev server (localhost:4321)
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build
- `npm run format` — format with Prettier (includes Astro plugin)
- `npm run deploy` — build and deploy to GitHub Pages via gh-pages

## Architecture

- `src/content/blog/` — markdown blog posts (each in its own directory with `index.md`)
- `src/content/resume/` — markdown files for resume timeline events
- `src/content.config.ts` — Astro content collection schemas (Zod)
- `src/assets/` — processed images (profile pic, etc.)
- `src/pages/` — page components: index (landing), blog listing, blog post, resume, 404
- `src/layouts/` — layout templates (LandingLayout, BlogLayout, ResumeLayout)
- `src/components/` — Astro components (BaseHead, Bio, Container, icons, resume)
- `src/styles/` — extracted typography CSS (landing.css, blog.css, resume.css)
- `src/data/site.ts` — site configuration (replaces gatsby-config siteMetadata)
- `public/` — static assets served as-is (favicon, fonts, images, resume PDF, CNAME)

## Content

Blog posts live in `src/content/blog/<slug>/index.md` with frontmatter: `title`, `date`, `description`.
Resume events live in `src/content/resume/*.md` with frontmatter: `era`, `date`, `title`.
Blog post slugs are generated as `/blog/<directory-name>/`.

## Styling

- Extracted Typography.js CSS in `src/styles/` (no runtime dependency)
- Astro scoped `<style>` blocks in components
- CSS custom properties for resume colors
- Shiki for code syntax highlighting (Solarized Light/Dark dual themes)
- `@fontsource/merriweather` for blog typography
- Google Fonts link for Schoolbell (landing page)

## Code Style

- Prettier: no semicolons, no parens on single arrow params, prose wrap always
- Astro components (`.astro`) for all pages and components
- TypeScript for data files and content schemas

## Commits

Use [Gitmoji](https://gitmoji.dev/) prefixes in commit messages. Common ones for this project:

- ✨ `:sparkles:` — new feature (e.g. new blog post, new page)
- 🐛 `:bug:` — bug fix
- 💄 `:lipstick:` — UI/style changes
- 📝 `:memo:` — documentation
- ♻️ `:recycle:` — refactor
- ⬆️ `:arrow_up:` — upgrade dependencies
- 🔧 `:wrench:` — configuration changes
- 🎨 `:art:` — improve structure/format
- 🔥 `:fire:` — remove code or files
- 👷 `:construction_worker:` — CI changes

Run `gitmoji --list` to see all available options.

## Deployment

Push to `main` triggers GitHub Actions workflow that builds and publishes
to GitHub Pages via `gh-pages` (deploys to `gh-pages` branch).
Site is served from custom domain `johnathangilday.com` (see `public/CNAME`).
Build output goes to `dist/`.

# johnathangilday.com

Personal website for Johnathan Gilday — landing page, blog, and resume.
Built with Gatsby 5 and React 18.

## Commands

- `npm run develop` — start dev server (localhost:8000)
- `npm run build` — production build to `public/`
- `npm run format` — format with Prettier
- `npm run clean` — clear Gatsby cache (`.cache/` and `public/`)
- `npm run deploy` — build and deploy to GitHub Pages via gh-pages

## Architecture

- `content/blog/` — markdown blog posts (each in its own directory with `index.md`)
- `content/resume/` — markdown files for resume timeline events
- `content/assets/` — shared images (profile pic, etc.)
- `src/pages/` — page components: index (landing), blog listing, resume, 404
- `src/templates/blog-post.js` — template for individual blog posts
- `src/components/` — React components (mix of `.js` and `.tsx`)
- `src/components/resume/` — resume timeline components
- `static/` — static assets served as-is (favicon, fonts, resume PDF, CNAME)

## Content

Blog posts live in `content/blog/<slug>/index.md` with frontmatter: `title`, `date`, `description`.
Resume events live in `content/resume/*.md` with frontmatter parsed by GraphQL.
Blog post slugs are generated as `/blog/<directory-name>/`.

## Styling

- Emotion (CSS-in-JS) for component styles
- PostCSS with custom media queries (`postcss-custom-media`)
- Typography.js with Sutro theme and Merriweather typeface (blog pages)
- Code syntax highlighting via `gatsby-remark-vscode` (Solarized Light/Dark)

## Code Style

- Prettier: no semicolons, no parens on single arrow params, prose wrap always
- Mixed JS and TSX — no strict convention; newer components tend to be TSX

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
Site is served from custom domain `johnathangilday.com` (see `static/CNAME`).

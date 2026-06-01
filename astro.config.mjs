import { defineConfig } from "astro/config"
import remarkSmartypants from "remark-smartypants"
import { remarkAlert } from "remark-github-blockquote-alert"
import sitemap from "@astrojs/sitemap"

export default defineConfig({
  integrations: [sitemap()],
  site: "https://johnathangilday.com",
  output: "static",
  trailingSlash: "always",
  markdown: {
    remarkPlugins: [remarkSmartypants, remarkAlert],
    shikiConfig: {
      themes: {
        light: "solarized-light",
        dark: "solarized-dark",
      },
    },
  },
  build: {
    assets: "_astro",
  },
})

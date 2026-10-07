import { defineConfig } from "astro/config"
import { unified } from "@astrojs/markdown-remark"
import remarkSmartypants from "remark-smartypants"
import { remarkAlert } from "remark-github-blockquote-alert"
import sitemap from "@astrojs/sitemap"

export default defineConfig({
  integrations: [sitemap()],
  site: "https://johnathangilday.com",
  output: "static",
  trailingSlash: "always",
  markdown: {
    processor: unified({ remarkPlugins: [remarkSmartypants, remarkAlert] }),
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

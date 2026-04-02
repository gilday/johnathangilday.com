import { defineConfig } from "astro/config"
import remarkSmartypants from "remark-smartypants"

export default defineConfig({
  site: "https://johnathangilday.com",
  output: "static",
  trailingSlash: "always",
  markdown: {
    remarkPlugins: [remarkSmartypants],
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

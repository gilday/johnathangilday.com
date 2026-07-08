import { OGImageRoute } from "astro-og-canvas"
import { getCollection } from "astro:content"
import { getSlug } from "../../../utils/slug"

// Build a map of blog-post slug -> post entry. astro-og-canvas turns each
// entry into a statically-generated PNG at `/blog/og/<slug>.png`.
const posts = await getCollection("blog")
const pages = Object.fromEntries(posts.map((post) => [getSlug(post.id), post]))

// Brand palette (mirrors the blog's dark-mode theme in src/styles/blog.css):
//   background  #121212  -> [18, 18, 18]
//   accent      #06ff68  -> [6, 255, 104]
//   text        #ffffff  -> [255, 255, 255]
const ACCENT: [number, number, number] = [6, 255, 104]
const TEXT: [number, number, number] = [255, 255, 255]

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  // The map key is already the post slug; use it verbatim as the route param.
  getSlug: (path) => path,
  getImageOptions: (_path, post) => ({
    title: post.data.title,
    // Card sub-text: author + domain (the SEO og:description is set separately
    // in BaseHead.astro). Middle dot instead of an em dash by house style.
    description: "Johnathan Gilday · johnathangilday.com",
    bgGradient: [
      [18, 18, 18],
      [30, 30, 30],
    ],
    // Accent bar down the leading edge — the one brand motif, kept subtle.
    border: { color: ACCENT, width: 24, side: "inline-start" },
    padding: 80,
    font: {
      title: {
        color: TEXT,
        size: 68,
        lineHeight: 1.1,
        weight: "bold",
        families: ["Open Sans"],
      },
      description: {
        color: ACCENT,
        size: 30,
        weight: "normal",
        families: ["Open Sans"],
      },
    },
    fonts: [
      "./src/assets/fonts/OpenSans-Bold.ttf",
      "./src/assets/fonts/OpenSans-Regular.ttf",
    ],
    format: "PNG",
  }),
})

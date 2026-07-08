import type { APIRoute } from "astro"
import { getCollection } from "astro:content"
import { readFile } from "node:fs/promises"
import satori from "satori"
import { Resvg } from "@resvg/resvg-js"
import sharp from "sharp"
import { getSlug } from "../../../utils/slug"

// Open Graph "title card" generator for blog posts.
//
// Rendered with satori (layout -> SVG) then rasterized with resvg at 2x
// (2400x1260) for crisp text, and finally flattened with sharp to strip the
// alpha channel. LinkedIn mishandles PNG transparency: it downscaled the old
// RGBA card to a tiny `articleshare-shrink_160` derivative and showed it
// blurry. An opaque RGB PNG at 2x avoids that. The design is unchanged from
// the previous astro-og-canvas card: a #06ff68 accent bar, a white Open Sans
// title, and a green "Johnathan Gilday · johnathangilday.com" byline.

// Logical card dimensions. resvg upscales to 2x (see SCALE) when rasterizing,
// so the emitted PNG is CARD_WIDTH*SCALE x CARD_HEIGHT*SCALE (2400x1260).
const CARD_WIDTH = 1200
const CARD_HEIGHT = 630
const SCALE = 2

// Brand palette (mirrors the blog's dark-mode theme in src/styles/blog.css).
const BG_DARK = "rgb(18, 18, 18)" // #121212
const BG_LIGHT = "rgb(30, 30, 30)" // subtle gradient partner
const ACCENT = "rgb(6, 255, 104)" // #06ff68
const TEXT = "rgb(255, 255, 255)" // #ffffff
const FLATTEN_BG = "#121212" // opaque backstop when dropping alpha

const fontBold = await readFile("./src/assets/fonts/OpenSans-Bold.ttf")
const fontRegular = await readFile("./src/assets/fonts/OpenSans-Regular.ttf")

/**
 * Some post titles lead with a decorative emoji (e.g. "🔒 XML External Entity…").
 * We have no emoji font loaded, so strip any leading run of pictographic
 * characters, emoji modifiers (U+FE0F variation selector, U+200D zero-width
 * joiner), and the whitespace that follows so the rendered title starts flush.
 * The full original title (emoji and all) is still used for og:image:alt in
 * BaseHead.astro.
 */
function cardTitle(title: string): string {
  return title
    .replace(/^[\p{Extended_Pictographic}\u{FE0F}\u{200D}\s]+/u, "")
    .trimStart()
}

/** Minimal hyperscript so we can build satori's element tree without JSX. */
function el(type: string, style: Record<string, unknown>, children: unknown) {
  return { type, props: { style, children } }
}

function card(title: string) {
  return el(
    "div",
    {
      width: "100%",
      height: "100%",
      display: "flex",
      backgroundImage: `linear-gradient(135deg, ${BG_DARK}, ${BG_LIGHT})`,
      fontFamily: "Open Sans",
    },
    [
      // Accent bar down the leading edge — the one brand motif, kept subtle.
      el(
        "div",
        { width: "24px", height: "100%", backgroundColor: ACCENT, flexShrink: 0 },
        ""
      ),
      el(
        "div",
        { display: "flex", flexDirection: "column", flex: 1, padding: "80px" },
        [
          el(
            "div",
            {
              fontSize: "68px",
              fontWeight: 700,
              lineHeight: 1.1,
              color: TEXT,
              // `display: flex` lets satori wrap long titles across lines.
              display: "flex",
            },
            title
          ),
          el(
            "div",
            {
              fontSize: "30px",
              fontWeight: 400,
              color: ACCENT,
              marginTop: "30px",
            },
            "Johnathan Gilday · johnathangilday.com"
          ),
        ]
      ),
    ]
  )
}

export function getStaticPaths() {
  return getCollection("blog").then((posts) =>
    posts.map((post) => ({
      params: { slug: getSlug(post.id) },
      props: { title: post.data.title },
    }))
  )
}

export const GET: APIRoute = async ({ props }) => {
  const svg = await satori(card(cardTitle(props.title as string)) as never, {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    fonts: [
      { name: "Open Sans", data: fontBold, weight: 700, style: "normal" },
      { name: "Open Sans", data: fontRegular, weight: 400, style: "normal" },
    ],
  })

  // Rasterize the vector SVG at 2x for crisp text at the target resolution.
  const rendered = new Resvg(svg, {
    fitTo: { mode: "width", value: CARD_WIDTH * SCALE },
    background: FLATTEN_BG,
  }).render()

  // Flatten onto the solid brand background to guarantee an opaque RGB PNG
  // with no alpha channel (LinkedIn mishandles PNG transparency).
  const png = await sharp(rendered.asPng())
    .flatten({ background: FLATTEN_BG })
    .png()
    .toBuffer()

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}

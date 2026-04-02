import { defineCollection, z } from "astro:content"

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
  }),
})

const resume = defineCollection({
  type: "content",
  schema: z.object({
    era: z.string(),
    date: z.string(),
    title: z.string(),
  }),
})

export const collections = { blog, resume }

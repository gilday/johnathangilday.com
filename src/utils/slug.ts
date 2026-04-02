export function getSlug(id: string): string {
  return id.replace(/\/index\.md$/, "").replace(/\.md$/, "")
}

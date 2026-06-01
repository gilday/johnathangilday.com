export function getSlug(id: string): string {
  return id.replace(/\/index$/, "")
}

// utils/sanitizeURL.ts
export const sanitizeURL = (base: string, route: string): string => {
  return `${base.replace(/\/+$/, "")}/${route.replace(/^\/+/, "")}`
}

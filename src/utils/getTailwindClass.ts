export const getTailwindClass = () => {
  if (typeof window === "undefined") {
    return null
  }

  if (window.matchMedia("(min-width: 1536px)").matches) {
    return "2xl"
  }
  if (window.matchMedia("(min-width: 1280px)").matches) {
    return "xl"
  }
  if (window.matchMedia("(min-width: 1024px)").matches) {
    return "lg"
  }
  if (window.matchMedia("(min-width: 768px)").matches) {
    return "md"
  }
  if (window.matchMedia("(min-width: 640px)").matches) {
    return "sm"
  }
  return "default"
}

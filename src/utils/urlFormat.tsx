export function urlFormat(url: string) {
  return `/${url.replace(/\s+/g, "-").toLowerCase()}`;
}

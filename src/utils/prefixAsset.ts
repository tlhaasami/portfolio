const PORTFOLIO_CONTENT_CDN = "https://cdn.jsdelivr.net/gh/tlhaasami/portfoliocontent@main";

export function getPrefix(): string {
  // All configuration/content data (portfolio-defaults, ballpit, technologies)
  // are hosted decoupled in the portfoliocontent repository.
  return PORTFOLIO_CONTENT_CDN;
}

export function prefixAsset(path: string): string {
  if (!path) return path;

  // If it's already an absolute URL, return it
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }

  // Fallback to local next base prefix if there are any other local assets
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  // Avoid double prefixing
  if (base && path.startsWith(base)) return path;
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
}



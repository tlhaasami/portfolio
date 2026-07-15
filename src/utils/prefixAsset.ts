export function getPrefix(): string {
  // Try client-side detection first in browser environment
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;

    if (hostname.endsWith(".github.io")) {
      const segments = pathname.split("/").filter(Boolean);
      // If it's a project page (not user page which is <username>.github.io), the first segment is the repo name
      if (segments.length > 0 && !hostname.startsWith(segments[0])) {
        return `/${segments[0]}`;
      }
    }
  }

  // Fallback to build time env public base path configuration
  return process.env.NEXT_PUBLIC_BASE_PATH || "";
}

export function prefixAsset(path: string): string {
  if (!path) return path;
  if (
    path.startsWith("http://") || 
    path.startsWith("https://") || 
    path.startsWith("data:")
  ) {
    return path;
  }
  const base = getPrefix();
  // Avoid double prefixing
  if (base && path.startsWith(base)) return path;
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
}


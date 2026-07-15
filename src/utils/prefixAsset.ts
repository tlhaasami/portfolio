export function getPrefix(): string {
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_BASE_PATH || "";
  }
  
  // If next public base path is configured at build time, use it
  const buildTimeBase = process.env.NEXT_PUBLIC_BASE_PATH;
  if (buildTimeBase) return buildTimeBase;

  // Otherwise detect from hostname/pathname
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;

  if (hostname.endsWith(".github.io")) {
    const segments = pathname.split("/").filter(Boolean);
    // If it's a project page (not user page which is <username>.github.io), the first segment is the repo name
    if (segments.length > 0 && !hostname.startsWith(segments[0])) {
      return `/${segments[0]}`;
    }
  }

  return "";
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


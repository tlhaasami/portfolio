export function prefixAsset(path: string): string {
  if (!path) return path;
  if (
    path.startsWith("http://") || 
    path.startsWith("https://") || 
    path.startsWith("data:")
  ) {
    return path;
  }
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  // Avoid double prefixing
  if (base && path.startsWith(base)) return path;
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
}

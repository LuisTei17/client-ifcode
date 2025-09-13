const API_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');


export function resolvePublicUrl(path?: string | null) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;

  const normalizedPath = path.startsWith('/') ? path.replace(/^\/+/, '') : path;
  if (API_URL) return `${API_URL}/${normalizedPath}`;
  return `/${normalizedPath}`;
}

export default resolvePublicUrl;

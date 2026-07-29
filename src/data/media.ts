const R2_PUBLIC_URL = import.meta.env.R2_PUBLIC_URL || 'https://pub-0e8b2f3d84ed4442bac9e16d61465b6c.r2.dev';
const R2_PATH_PREFIX = import.meta.env.R2_PATH_PREFIX || 'Cloudfare/website';

export function media(src: string): string {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  const base = R2_PUBLIC_URL.replace(/\/+$/, '');
  const prefix = R2_PATH_PREFIX ? `/${R2_PATH_PREFIX.replace(/^\/+|\/+$/g, '')}` : '';
  const path = src.startsWith('/') ? src : `/${src}`;
  return `${base}${prefix}${path}`;
}

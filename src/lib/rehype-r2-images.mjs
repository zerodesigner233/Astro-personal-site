const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || 'https://pub-0e8b2f3d84ed4442bac9e16d61465b6c.r2.dev';
const R2_PATH_PREFIX = process.env.R2_PATH_PREFIX || 'Cloudfare/website';

const base = R2_PUBLIC_URL.replace(/\/+$/, '');
const prefix = R2_PATH_PREFIX ? `/${R2_PATH_PREFIX.replace(/^\/+|\/+$/g, '')}` : '';

function visit(node, callback) {
  if (node && typeof node === 'object') {
    callback(node);
    if (node.children) {
      for (const child of node.children) {
        visit(child, callback);
      }
    }
  }
}

export function rehypeR2Images() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.tagName === 'img' && node.properties?.src) {
        const src = node.properties.src;
        if (typeof src === 'string' && !src.startsWith('http') && !src.startsWith('data:')) {
          const path = src.startsWith('/') ? src : `/${src}`;
          node.properties.src = `${base}${prefix}${path}`;
        }
      }
    });
  };
}

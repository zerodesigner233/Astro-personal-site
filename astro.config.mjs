// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { rehypeR2Images } from './src/lib/rehype-r2-images.mjs';

// https://astro.build/config
export default defineConfig({
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeR2Images],
    }),
  },
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});

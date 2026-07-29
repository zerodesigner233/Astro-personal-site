import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    tags: z.array(z.string()),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const works = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    title_zh: z.string().optional(),
    date: z.coerce.date(),
    category: z.enum(['painting', 'music', 'design', 'code']),
    cover: z.string().optional(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    description: z.string().optional(),
    description_zh: z.string().optional(),
    links: z.array(z.object({
      label: z.string(),
      url: z.string(),
    })).optional(),
  }),
});

export const collections = { blog, works };

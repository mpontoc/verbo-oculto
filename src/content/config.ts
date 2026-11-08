import { defineCollection, z } from 'astro:content';

const post = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Verbo Oculto'),
    category: z.enum(['hermetismo', 'apocrifos', 'salomao', 'gnose', 'pratica', 'guias']),
    tags: z.array(z.string()),
    keywords: z.array(z.string()),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    heroCredit: z.string().optional(),
    heroCreditUrl: z.string().optional(),
    schema: z.object({
      type: z.string().default('Article'),
      wordCount: z.number().optional(),
      timeRequired: z.string().optional(),
    }).optional(),
  }),
});

export const collections = { post };

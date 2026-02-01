import { defineCollection, z } from 'astro:content';

const memesCollection = defineCollection({
    // Legacy style (Astro < 5 or Astro 5 Legacy)
    schema: z.object({
        title: z.string(),
        text: z.string().optional(),
        mediaUrl: z.string().optional().or(z.string().length(0)),
        userPhoto: z.string().optional().or(z.string().length(0)),
        username: z.string(),
        pubDate: z.preprocess((val) => {
            if (val instanceof Date) return val.toISOString().split('T')[0];
            return val;
        }, z.string()),
    }),
});

export const collections = {
    'memes': memesCollection,
};

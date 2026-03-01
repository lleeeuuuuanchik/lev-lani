import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
	collections: {
		services: defineCollection({
			type: 'data',
			source: 'services/*.yml',
			schema: z.object({
				title: z.string(),
				excerpt: z.string(),
				cost: z.string(),
				icon: z.string(),
				order: z.number(),
			}),
		}),
	},
});

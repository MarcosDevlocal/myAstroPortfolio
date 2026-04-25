import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
	schema: z.object({
		name: z.string(),
		description: z.string(),
		tech: z.array(z.string()),
		link: z.string().optional(),
		type: z.enum(["product", "client", "open-source"]).default("product"),
		order: z.number().default(0)
	})
});

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		excerpt: z.string(),
		date: z.coerce.date(),
		order: z.number().default(0)
	})
});

export const collections = { projects, blog };

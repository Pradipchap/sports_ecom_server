import { z } from "zod";

const baseProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  image: z.string().url().optional(),
  stock: z.number().int().nonnegative(),
  availableSizes: z.array(z.number().int().min(1).max(10)).min(1),
  categoryId: z.string().min(1),
});

export const createProductSchema = baseProductSchema.refine((data) => Boolean(data.image), {
  message: "An image upload or valid image URL is required",
  path: ["image"],
});

export const updateProductSchema = baseProductSchema.partial();

import { z } from "zod";

export const addToCartSchema = z.object({
  productId: z.string().min(1),
  size: z.number().int().min(1).max(10),
  quantity: z.number().int().positive(),
});

export const updateCartSchema = z.object({
  productId: z.string().min(1),
  size: z.number().int().min(1).max(10),
  quantity: z.number().int().positive(),
});

export const removeCartItemSchema = z.object({
  productId: z.string().min(1),
  size: z.number().int().min(1).max(10),
});

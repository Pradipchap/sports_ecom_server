import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { cartService } from "./cart.service";
import { addToCartSchema, removeCartItemSchema, updateCartSchema } from "./cart.validation";

export const getCart = asyncHandler(async (req: Request, res: Response) => {
  const cart = await cartService.get(req.user!.id);
  res.json({ cart });
});

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const parsed = addToCartSchema.parse(req.body);
  const cart = await cartService.add(req.user!.id, parsed.productId, parsed.size, parsed.quantity);
  res.status(201).json({ cart });
});

export const updateCartItem = asyncHandler(async (req: Request, res: Response) => {
  const parsed = updateCartSchema.parse(req.body);
  const cart = await cartService.update(req.user!.id, parsed.productId, parsed.size, parsed.quantity);
  res.json({ cart });
});

export const removeCartItem = asyncHandler(async (req: Request, res: Response) => {
  const parsed = removeCartItemSchema.parse(req.body);
  const cart = await cartService.remove(req.user!.id, parsed.productId, parsed.size);
  res.json({ cart });
});

import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { categoryService } from "./category.service";
import { createCategorySchema } from "./category.validation";

export const getCategories = asyncHandler(async (_req: Request, res: Response) => {
  const categories = await categoryService.list();
  res.json({ categories });
});

export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const parsed = createCategorySchema.parse(req.body);
  const category = await categoryService.create(parsed.name);
  res.status(201).json({ category });
});

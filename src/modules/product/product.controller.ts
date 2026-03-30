import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { productService } from "./product.service";
import { createProductSchema, updateProductSchema } from "./product.validation";

const getImageUrl = (req: Request) => {
  if (req.file) {
    return `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  }

  const bodyImage = req.body.image;
  return typeof bodyImage === "string" && bodyImage.trim() ? bodyImage.trim() : undefined;
};

const parseOptionalSizeFilter = (raw: unknown): number | undefined => {
  if (raw === undefined || raw === "") return undefined;
  const n = Number(String(raw).trim());
  if (!Number.isInteger(n) || n < 1 || n > 10) return undefined;
  return n;
};

const parseOptionalNonNegativePrice = (raw: unknown): number | undefined => {
  if (raw === undefined || raw === "") return undefined;
  const n = Number(String(raw).trim());
  if (!Number.isFinite(n) || n < 0) return undefined;
  return n;
};

const parseProductPayload = (req: Request) => ({
  availableSizes:
    typeof req.body.availableSizes === "string"
      ? JSON.parse(req.body.availableSizes)
      : req.body.availableSizes,
  name: typeof req.body.name === "string" ? req.body.name.trim() : req.body.name,
  description:
    typeof req.body.description === "string" ? req.body.description.trim() : req.body.description,
  price: req.body.price === undefined ? undefined : Number(req.body.price),
  image: getImageUrl(req),
  stock: req.body.stock === undefined ? undefined : Number(req.body.stock),
  categoryId:
    typeof req.body.categoryId === "string" ? req.body.categoryId.trim() : req.body.categoryId,
});

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const search = req.query.search?.toString();
  const categoryId = req.query.categoryId?.toString();
  const size = parseOptionalSizeFilter(req.query.size);
  let minPrice = parseOptionalNonNegativePrice(req.query.minPrice);
  let maxPrice = parseOptionalNonNegativePrice(req.query.maxPrice);
  if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
    [minPrice, maxPrice] = [maxPrice, minPrice];
  }
  const excludeId = req.query.excludeId?.toString();
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 10;

  const data = await productService.list({ search, categoryId, size, minPrice, maxPrice, excludeId, page, limit });
  res.json(data);
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const productId = String(req.params.id);
  const product = await productService.getById(productId);
  res.json({ product });
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const parsed = createProductSchema.parse(parseProductPayload(req));
  const product = await productService.create({
    ...parsed,
    image: parsed.image!,
  });
  res.status(201).json({
    product: {
      ...product,
      price: Number(product.price),
    },
  });
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const parsed = updateProductSchema.parse(parseProductPayload(req));
  const productId = String(req.params.id);
  const product = await productService.update(productId, parsed);
  res.json({
    product: {
      ...product,
      price: Number(product.price),
    },
  });
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const productId = String(req.params.id);
  await productService.remove(productId);
  res.json({ message: "Product deleted" });
});

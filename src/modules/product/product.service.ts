import { Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/ApiError";
import { removeLocalUpload } from "../../utils/file";

type ProductInput = {
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  availableSizes: number[];
  categoryId: string;
};

type ProductUpdateInput = Partial<ProductInput>;

export const productService = {
  async list(params: {
    search?: string;
    categoryId?: string;
    size?: number;
    minPrice?: number;
    maxPrice?: number;
    excludeId?: string;
    page?: number;
    limit?: number;
  }) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {};

    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: "insensitive" } },
        { description: { contains: params.search, mode: "insensitive" } },
      ];
    }

    if (params.categoryId) {
      where.categoryId = params.categoryId;
    }

    if (params.size) {
      where.availableSizes = {
        has: params.size,
      };
    }

    if (params.minPrice !== undefined || params.maxPrice !== undefined) {
      where.price = {};
      if (params.minPrice !== undefined) {
        where.price.gte = params.minPrice;
      }
      if (params.maxPrice !== undefined) {
        where.price.lte = params.maxPrice;
      }
    }

    if (params.excludeId) {
      where.id = { not: params.excludeId };
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return {
      products: products.map((product) => ({
        ...product,
        price: Number(product.price),
      })),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    return {
      ...product,
      price: Number(product.price),
    };
  },

  create(input: ProductInput) {
    return prisma.product.create({
      data: {
        ...input,
        price: input.price,
      },
    });
  },

  async update(id: string, input: ProductUpdateInput) {
    const existing = await prisma.product.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new ApiError(404, "Product not found");
    }

    if (input.image && input.image !== existing.image) {
      removeLocalUpload(existing.image);
    }

    return prisma.product.update({
      where: { id },
      data: input,
    });
  },

  async remove(id: string) {
    const existing = await prisma.product.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new ApiError(404, "Product not found");
    }

    removeLocalUpload(existing.image);

    await prisma.product.delete({
      where: { id },
    });
  },
};

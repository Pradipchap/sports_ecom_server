"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const prisma_1 = require("../../config/prisma");
const ApiError_1 = require("../../utils/ApiError");
const file_1 = require("../../utils/file");
exports.productService = {
    async list(params) {
        const page = params.page ?? 1;
        const limit = params.limit ?? 10;
        const skip = (page - 1) * limit;
        const where = {};
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
            prisma_1.prisma.product.findMany({
                where,
                include: { category: true },
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            prisma_1.prisma.product.count({ where }),
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
    async getById(id) {
        const product = await prisma_1.prisma.product.findUnique({
            where: { id },
            include: { category: true },
        });
        if (!product) {
            throw new ApiError_1.ApiError(404, "Product not found");
        }
        return {
            ...product,
            price: Number(product.price),
        };
    },
    create(input) {
        return prisma_1.prisma.product.create({
            data: {
                ...input,
                price: input.price,
            },
        });
    },
    async update(id, input) {
        const existing = await prisma_1.prisma.product.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new ApiError_1.ApiError(404, "Product not found");
        }
        if (input.image && input.image !== existing.image) {
            (0, file_1.removeLocalUpload)(existing.image);
        }
        return prisma_1.prisma.product.update({
            where: { id },
            data: input,
        });
    },
    async remove(id) {
        const existing = await prisma_1.prisma.product.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new ApiError_1.ApiError(404, "Product not found");
        }
        (0, file_1.removeLocalUpload)(existing.image);
        await prisma_1.prisma.product.delete({
            where: { id },
        });
    },
};
//# sourceMappingURL=product.service.js.map
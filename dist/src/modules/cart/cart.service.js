"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartService = void 0;
const prisma_1 = require("../../config/prisma");
const ApiError_1 = require("../../utils/ApiError");
const ensureCart = async (userId) => {
    const existing = await prisma_1.prisma.cart.findUnique({
        where: { userId },
    });
    if (existing) {
        return existing;
    }
    return prisma_1.prisma.cart.create({
        data: { userId },
    });
};
const normalizeCart = async (userId) => {
    const cart = await ensureCart(userId);
    const fullCart = await prisma_1.prisma.cart.findUnique({
        where: { id: cart.id },
        include: {
            items: {
                include: {
                    product: {
                        include: { category: true },
                    },
                },
            },
        },
    });
    if (!fullCart) {
        throw new ApiError_1.ApiError(404, "Cart not found");
    }
    return {
        id: fullCart.id,
        userId: fullCart.userId,
        items: fullCart.items.map((item) => ({
            ...item,
            product: {
                ...item.product,
                price: Number(item.product.price),
            },
        })),
    };
};
exports.cartService = {
    get(userId) {
        return normalizeCart(userId);
    },
    async add(userId, productId, size, quantity) {
        const cart = await ensureCart(userId);
        const product = await prisma_1.prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            throw new ApiError_1.ApiError(404, "Product not found");
        }
        if (!product.availableSizes.includes(size)) {
            throw new ApiError_1.ApiError(400, "Selected size is not available for this product");
        }
        const existing = await prisma_1.prisma.cartItem.findUnique({
            where: { cartId_productId_size: { cartId: cart.id, productId, size } },
        });
        if (existing) {
            await prisma_1.prisma.cartItem.update({
                where: { id: existing.id },
                data: { quantity: existing.quantity + quantity },
            });
        }
        else {
            await prisma_1.prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    size,
                    quantity,
                },
            });
        }
        return normalizeCart(userId);
    },
    async update(userId, productId, size, quantity) {
        const cart = await ensureCart(userId);
        const item = await prisma_1.prisma.cartItem.findUnique({
            where: { cartId_productId_size: { cartId: cart.id, productId, size } },
        });
        if (!item) {
            throw new ApiError_1.ApiError(404, "Cart item not found");
        }
        await prisma_1.prisma.cartItem.update({
            where: { id: item.id },
            data: { quantity },
        });
        return normalizeCart(userId);
    },
    async remove(userId, productId, size) {
        const cart = await ensureCart(userId);
        const item = await prisma_1.prisma.cartItem.findUnique({
            where: { cartId_productId_size: { cartId: cart.id, productId, size } },
        });
        if (!item) {
            throw new ApiError_1.ApiError(404, "Cart item not found");
        }
        await prisma_1.prisma.cartItem.delete({
            where: { id: item.id },
        });
        return normalizeCart(userId);
    },
};
//# sourceMappingURL=cart.service.js.map
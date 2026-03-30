import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/ApiError";

const ensureCart = async (userId: string) => {
  const existing = await prisma.cart.findUnique({
    where: { userId },
  });

  if (existing) {
    return existing;
  }

  return prisma.cart.create({
    data: { userId },
  });
};

const normalizeCart = async (userId: string) => {
  const cart = await ensureCart(userId);
  const fullCart = await prisma.cart.findUnique({
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
    throw new ApiError(404, "Cart not found");
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

export const cartService = {
  get(userId: string) {
    return normalizeCart(userId);
  },

  async add(userId: string, productId: string, size: number, quantity: number) {
    const cart = await ensureCart(userId);
    const product = await prisma.product.findUnique({ where: { id: productId } });

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    if (!product.availableSizes.includes(size)) {
      throw new ApiError(400, "Selected size is not available for this product");
    }

    const existing = await prisma.cartItem.findUnique({
      where: { cartId_productId_size: { cartId: cart.id, productId, size } },
    });

    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
    } else {
      await prisma.cartItem.create({
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

  async update(userId: string, productId: string, size: number, quantity: number) {
    const cart = await ensureCart(userId);
    const item = await prisma.cartItem.findUnique({
      where: { cartId_productId_size: { cartId: cart.id, productId, size } },
    });

    if (!item) {
      throw new ApiError(404, "Cart item not found");
    }

    await prisma.cartItem.update({
      where: { id: item.id },
      data: { quantity },
    });

    return normalizeCart(userId);
  },

  async remove(userId: string, productId: string, size: number) {
    const cart = await ensureCart(userId);
    const item = await prisma.cartItem.findUnique({
      where: { cartId_productId_size: { cartId: cart.id, productId, size } },
    });

    if (!item) {
      throw new ApiError(404, "Cart item not found");
    }

    await prisma.cartItem.delete({
      where: { id: item.id },
    });

    return normalizeCart(userId);
  },
};

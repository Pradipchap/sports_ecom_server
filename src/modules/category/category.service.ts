import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/ApiError";

export const categoryService = {
  list() {
    return prisma.category.findMany({
      orderBy: { name: "asc" },
    });
  },

  async create(name: string) {
    const exists = await prisma.category.findUnique({
      where: { name },
    });

    if (exists) {
      throw new ApiError(409, "Category already exists");
    }

    return prisma.category.create({
      data: { name },
    });
  },
};

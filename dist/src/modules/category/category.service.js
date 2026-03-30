"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const prisma_1 = require("../../config/prisma");
const ApiError_1 = require("../../utils/ApiError");
exports.categoryService = {
    list() {
        return prisma_1.prisma.category.findMany({
            orderBy: { name: "asc" },
        });
    },
    async create(name) {
        const exists = await prisma_1.prisma.category.findUnique({
            where: { name },
        });
        if (exists) {
            throw new ApiError_1.ApiError(409, "Category already exists");
        }
        return prisma_1.prisma.category.create({
            data: { name },
        });
    },
};
//# sourceMappingURL=category.service.js.map
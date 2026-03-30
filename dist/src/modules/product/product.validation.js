"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
const baseProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    description: zod_1.z.string().min(10),
    price: zod_1.z.number().positive(),
    image: zod_1.z.string().url().optional(),
    stock: zod_1.z.number().int().nonnegative(),
    availableSizes: zod_1.z.array(zod_1.z.number().int().min(1).max(10)).min(1),
    categoryId: zod_1.z.string().min(1),
});
exports.createProductSchema = baseProductSchema.refine((data) => Boolean(data.image), {
    message: "An image upload or valid image URL is required",
    path: ["image"],
});
exports.updateProductSchema = baseProductSchema.partial();
//# sourceMappingURL=product.validation.js.map
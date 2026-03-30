"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
/** HTTP(S) URL or server-relative upload path e.g. /uploads/photo.jpg */
const imageFieldSchema = zod_1.z
    .string()
    .refine((val) => {
    if (val.startsWith("/"))
        return true;
    try {
        // eslint-disable-next-line no-new
        new URL(val);
        return true;
    }
    catch {
        return false;
    }
}, { message: "Image must be a valid URL or a path starting with /" });
const baseProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    description: zod_1.z.string().min(10),
    price: zod_1.z.number().positive(),
    image: imageFieldSchema.optional(),
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
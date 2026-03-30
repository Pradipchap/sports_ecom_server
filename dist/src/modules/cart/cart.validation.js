"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCartItemSchema = exports.updateCartSchema = exports.addToCartSchema = void 0;
const zod_1 = require("zod");
exports.addToCartSchema = zod_1.z.object({
    productId: zod_1.z.string().min(1),
    size: zod_1.z.number().int().min(1).max(10),
    quantity: zod_1.z.number().int().positive(),
});
exports.updateCartSchema = zod_1.z.object({
    productId: zod_1.z.string().min(1),
    size: zod_1.z.number().int().min(1).max(10),
    quantity: zod_1.z.number().int().positive(),
});
exports.removeCartItemSchema = zod_1.z.object({
    productId: zod_1.z.string().min(1),
    size: zod_1.z.number().int().min(1).max(10),
});
//# sourceMappingURL=cart.validation.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCartItem = exports.updateCartItem = exports.addToCart = exports.getCart = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const cart_service_1 = require("./cart.service");
const cart_validation_1 = require("./cart.validation");
exports.getCart = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const cart = await cart_service_1.cartService.get(req.user.id);
    res.json({ cart });
});
exports.addToCart = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const parsed = cart_validation_1.addToCartSchema.parse(req.body);
    const cart = await cart_service_1.cartService.add(req.user.id, parsed.productId, parsed.size, parsed.quantity);
    res.status(201).json({ cart });
});
exports.updateCartItem = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const parsed = cart_validation_1.updateCartSchema.parse(req.body);
    const cart = await cart_service_1.cartService.update(req.user.id, parsed.productId, parsed.size, parsed.quantity);
    res.json({ cart });
});
exports.removeCartItem = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const parsed = cart_validation_1.removeCartItemSchema.parse(req.body);
    const cart = await cart_service_1.cartService.remove(req.user.id, parsed.productId, parsed.size);
    res.json({ cart });
});
//# sourceMappingURL=cart.controller.js.map
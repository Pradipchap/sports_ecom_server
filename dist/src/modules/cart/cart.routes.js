"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const cart_controller_1 = require("./cart.controller");
exports.cartRoutes = (0, express_1.Router)();
exports.cartRoutes.use(auth_middleware_1.authenticate);
exports.cartRoutes.get("/", cart_controller_1.getCart);
exports.cartRoutes.post("/add", cart_controller_1.addToCart);
exports.cartRoutes.put("/update", cart_controller_1.updateCartItem);
exports.cartRoutes.delete("/remove", cart_controller_1.removeCartItem);
//# sourceMappingURL=cart.routes.js.map
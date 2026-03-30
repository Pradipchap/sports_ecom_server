"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const cart_routes_1 = require("../modules/cart/cart.routes");
const category_routes_1 = require("../modules/category/category.routes");
const product_routes_1 = require("../modules/product/product.routes");
exports.appRouter = (0, express_1.Router)();
exports.appRouter.get("/health", (_req, res) => {
    res.json({ message: "Server is healthy" });
});
exports.appRouter.use("/auth", auth_routes_1.authRoutes);
exports.appRouter.use("/products", product_routes_1.productRoutes);
exports.appRouter.use("/categories", category_routes_1.categoryRoutes);
exports.appRouter.use("/cart", cart_routes_1.cartRoutes);
//# sourceMappingURL=index.js.map
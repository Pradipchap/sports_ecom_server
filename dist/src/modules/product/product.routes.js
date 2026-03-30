"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const upload_middleware_1 = require("../../middlewares/upload.middleware");
const product_controller_1 = require("./product.controller");
exports.productRoutes = (0, express_1.Router)();
exports.productRoutes.get("/", product_controller_1.getProducts);
exports.productRoutes.get("/:id", product_controller_1.getProductById);
exports.productRoutes.post("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(client_1.Role.ADMIN), upload_middleware_1.uploadProductImage, product_controller_1.createProduct);
exports.productRoutes.put("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(client_1.Role.ADMIN), upload_middleware_1.uploadProductImage, product_controller_1.updateProduct);
exports.productRoutes.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(client_1.Role.ADMIN), product_controller_1.deleteProduct);
//# sourceMappingURL=product.routes.js.map
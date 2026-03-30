"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const category_controller_1 = require("./category.controller");
exports.categoryRoutes = (0, express_1.Router)();
exports.categoryRoutes.get("/", category_controller_1.getCategories);
exports.categoryRoutes.post("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(client_1.Role.ADMIN), category_controller_1.createCategory);
//# sourceMappingURL=category.routes.js.map
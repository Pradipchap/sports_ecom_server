"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const auth_controller_1 = require("./auth.controller");
exports.authRoutes = (0, express_1.Router)();
exports.authRoutes.post("/signup", auth_controller_1.signup);
exports.authRoutes.post("/login", auth_controller_1.login);
exports.authRoutes.get("/me", auth_middleware_1.authenticate, auth_controller_1.me);
exports.authRoutes.post("/logout", auth_controller_1.logout);
//# sourceMappingURL=auth.routes.js.map
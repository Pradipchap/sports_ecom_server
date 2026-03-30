"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.me = exports.login = exports.signup = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const jwt_1 = require("../../utils/jwt");
const auth_service_1 = require("./auth.service");
const auth_validation_1 = require("./auth.validation");
exports.signup = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const parsed = auth_validation_1.signupSchema.parse(req.body);
    const data = await auth_service_1.authService.signup(parsed);
    (0, jwt_1.setAuthCookie)(res, data.token);
    res.status(201).json({
        message: "Signup successful",
        user: data.user,
    });
});
exports.login = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const parsed = auth_validation_1.loginSchema.parse(req.body);
    const data = await auth_service_1.authService.login(parsed);
    (0, jwt_1.setAuthCookie)(res, data.token);
    res.json({
        message: "Login successful",
        user: data.user,
    });
});
exports.me = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = await auth_service_1.authService.me(req.user.id);
    res.json({ user });
});
exports.logout = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    (0, jwt_1.clearAuthCookie)(res);
    res.json({ message: "Logout successful" });
});
//# sourceMappingURL=auth.controller.js.map
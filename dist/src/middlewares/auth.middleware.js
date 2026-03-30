"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const ApiError_1 = require("../utils/ApiError");
const jwt_1 = require("../utils/jwt");
const authenticate = (req, _res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return next(new ApiError_1.ApiError(401, "Unauthorized"));
    }
    try {
        const payload = (0, jwt_1.verifyToken)(token);
        req.user = {
            id: payload.id,
            email: payload.email,
            role: payload.role,
        };
        next();
    }
    catch (_error) {
        next(new ApiError_1.ApiError(401, "Invalid or expired token"));
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map
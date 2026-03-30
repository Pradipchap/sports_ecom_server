"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = void 0;
const multer_1 = __importDefault(require("multer"));
const zod_1 = require("zod");
const ApiError_1 = require("../utils/ApiError");
const notFoundHandler = (req, _res, next) => {
    next(new ApiError_1.ApiError(404, `Route not found: ${req.originalUrl}`));
};
exports.notFoundHandler = notFoundHandler;
const errorHandler = (error, _req, res, _next) => {
    if (error instanceof zod_1.ZodError) {
        return res.status(400).json({
            message: "Validation failed",
            errors: error.issues,
        });
    }
    if (error instanceof ApiError_1.ApiError) {
        return res.status(error.statusCode).json({
            message: error.message,
        });
    }
    if (error instanceof multer_1.default.MulterError) {
        return res.status(400).json({
            message: error.code === "LIMIT_FILE_SIZE" ? "Image must be 5MB or smaller" : error.message,
        });
    }
    if (error instanceof Error) {
        return res.status(400).json({
            message: error.message,
        });
    }
    return res.status(500).json({
        message: "Internal server error",
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map
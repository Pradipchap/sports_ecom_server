"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAuthCookie = exports.setAuthCookie = exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const signToken = (payload) => {
    const options = {
        expiresIn: env_1.env.jwtExpiresIn,
    };
    return jsonwebtoken_1.default.sign(payload, env_1.env.jwtSecret, options);
};
exports.signToken = signToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, env_1.env.jwtSecret);
};
exports.verifyToken = verifyToken;
const setAuthCookie = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true,
        secure: env_1.isProduction,
        sameSite: env_1.isProduction ? "none" : "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
};
exports.setAuthCookie = setAuthCookie;
const clearAuthCookie = (res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: env_1.isProduction,
        sameSite: env_1.isProduction ? "none" : "lax",
    });
};
exports.clearAuthCookie = clearAuthCookie;
//# sourceMappingURL=jwt.js.map
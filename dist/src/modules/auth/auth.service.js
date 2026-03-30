"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../../config/prisma");
const ApiError_1 = require("../../utils/ApiError");
const jwt_1 = require("../../utils/jwt");
const toSafeUser = (user) => {
    const { password: _password, ...safeUser } = user;
    return safeUser;
};
const issueAuthPayload = (user) => ({
    user: toSafeUser(user),
    token: (0, jwt_1.signToken)({
        id: user.id,
        email: user.email,
        role: user.role,
    }),
});
exports.authService = {
    async signup(input) {
        const existing = await prisma_1.prisma.user.findUnique({
            where: { email: input.email },
        });
        if (existing) {
            throw new ApiError_1.ApiError(409, "Email already in use");
        }
        const hashedPassword = await bcryptjs_1.default.hash(input.password, 10);
        const user = await prisma_1.prisma.user.create({
            data: {
                name: input.name,
                email: input.email,
                password: hashedPassword,
            },
        });
        await prisma_1.prisma.cart.create({
            data: { userId: user.id },
        });
        return issueAuthPayload(user);
    },
    async login(input) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { email: input.email },
        });
        if (!user) {
            throw new ApiError_1.ApiError(401, "Invalid credentials");
        }
        const validPassword = await bcryptjs_1.default.compare(input.password, user.password);
        if (!validPassword) {
            throw new ApiError_1.ApiError(401, "Invalid credentials");
        }
        return issueAuthPayload(user);
    },
    async me(userId) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new ApiError_1.ApiError(404, "User not found");
        }
        return toSafeUser(user);
    },
};
//# sourceMappingURL=auth.service.js.map
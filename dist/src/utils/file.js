"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeLocalUpload = exports.isLocalUploadUrl = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uploadsPrefix = "/uploads/";
const isLocalUploadUrl = (imageUrl) => Boolean(imageUrl && imageUrl.includes(uploadsPrefix));
exports.isLocalUploadUrl = isLocalUploadUrl;
const removeLocalUpload = (imageUrl) => {
    if (!(0, exports.isLocalUploadUrl)(imageUrl)) {
        return;
    }
    const fileName = imageUrl.split(uploadsPrefix)[1];
    if (!fileName) {
        return;
    }
    const absolutePath = path_1.default.join(process.cwd(), "uploads", fileName);
    if (fs_1.default.existsSync(absolutePath)) {
        fs_1.default.unlinkSync(absolutePath);
    }
};
exports.removeLocalUpload = removeLocalUpload;
//# sourceMappingURL=file.js.map
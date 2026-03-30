"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = exports.getCategories = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const category_service_1 = require("./category.service");
const category_validation_1 = require("./category.validation");
exports.getCategories = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const categories = await category_service_1.categoryService.list();
    res.json({ categories });
});
exports.createCategory = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const parsed = category_validation_1.createCategorySchema.parse(req.body);
    const category = await category_service_1.categoryService.create(parsed.name);
    res.status(201).json({ category });
});
//# sourceMappingURL=category.controller.js.map
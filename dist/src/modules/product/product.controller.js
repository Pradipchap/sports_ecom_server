"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const product_service_1 = require("./product.service");
const product_validation_1 = require("./product.validation");
const getImageUrl = (req) => {
    if (req.file) {
        return `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }
    const bodyImage = req.body.image;
    return typeof bodyImage === "string" && bodyImage.trim() ? bodyImage.trim() : undefined;
};
const parseProductPayload = (req) => ({
    availableSizes: typeof req.body.availableSizes === "string"
        ? JSON.parse(req.body.availableSizes)
        : req.body.availableSizes,
    name: typeof req.body.name === "string" ? req.body.name.trim() : req.body.name,
    description: typeof req.body.description === "string" ? req.body.description.trim() : req.body.description,
    price: req.body.price === undefined ? undefined : Number(req.body.price),
    image: getImageUrl(req),
    stock: req.body.stock === undefined ? undefined : Number(req.body.stock),
    categoryId: typeof req.body.categoryId === "string" ? req.body.categoryId.trim() : req.body.categoryId,
});
exports.getProducts = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const search = req.query.search?.toString();
    const categoryId = req.query.categoryId?.toString();
    const size = req.query.size ? Number(req.query.size) : undefined;
    const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
    const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;
    const excludeId = req.query.excludeId?.toString();
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const data = await product_service_1.productService.list({ search, categoryId, size, minPrice, maxPrice, excludeId, page, limit });
    res.json(data);
});
exports.getProductById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const productId = String(req.params.id);
    const product = await product_service_1.productService.getById(productId);
    res.json({ product });
});
exports.createProduct = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const parsed = product_validation_1.createProductSchema.parse(parseProductPayload(req));
    const product = await product_service_1.productService.create({
        ...parsed,
        image: parsed.image,
    });
    res.status(201).json({
        product: {
            ...product,
            price: Number(product.price),
        },
    });
});
exports.updateProduct = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const parsed = product_validation_1.updateProductSchema.parse(parseProductPayload(req));
    const productId = String(req.params.id);
    const product = await product_service_1.productService.update(productId, parsed);
    res.json({
        product: {
            ...product,
            price: Number(product.price),
        },
    });
});
exports.deleteProduct = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const productId = String(req.params.id);
    await product_service_1.productService.remove(productId);
    res.json({ message: "Product deleted" });
});
//# sourceMappingURL=product.controller.js.map
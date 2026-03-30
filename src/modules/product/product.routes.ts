import { Role } from "@prisma/client";
import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";
import { uploadProductImage } from "../../middlewares/upload.middleware";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./product.controller";

export const productRoutes = Router();

productRoutes.get("/", getProducts);
productRoutes.get("/:id", getProductById);
productRoutes.post("/", authenticate, authorize(Role.ADMIN), uploadProductImage, createProduct);
productRoutes.put("/:id", authenticate, authorize(Role.ADMIN), uploadProductImage, updateProduct);
productRoutes.delete("/:id", authenticate, authorize(Role.ADMIN), deleteProduct);

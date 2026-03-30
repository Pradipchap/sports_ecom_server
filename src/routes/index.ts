import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { cartRoutes } from "../modules/cart/cart.routes";
import { categoryRoutes } from "../modules/category/category.routes";
import { productRoutes } from "../modules/product/product.routes";

export const appRouter = Router();

appRouter.get("/health", (_req, res) => {
  res.json({ message: "Server is healthy" });
});

appRouter.use("/auth", authRoutes);
appRouter.use("/products", productRoutes);
appRouter.use("/categories", categoryRoutes);
appRouter.use("/cart", cartRoutes);

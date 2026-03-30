import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { addToCart, getCart, removeCartItem, updateCartItem } from "./cart.controller";

export const cartRoutes = Router();

cartRoutes.use(authenticate);
cartRoutes.get("/", getCart);
cartRoutes.post("/add", addToCart);
cartRoutes.put("/update", updateCartItem);
cartRoutes.delete("/remove", removeCartItem);

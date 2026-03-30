import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { login, logout, me, signup } from "./auth.controller";

export const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/me", authenticate, me);
authRoutes.post("/logout", logout);

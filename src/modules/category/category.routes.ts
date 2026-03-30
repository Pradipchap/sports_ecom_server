import { Role } from "@prisma/client";
import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";
import { createCategory, getCategories } from "./category.controller";

export const categoryRoutes = Router();

categoryRoutes.get("/", getCategories);
categoryRoutes.post("/", authenticate, authorize(Role.ADMIN), createCategory);

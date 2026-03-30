import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { verifyToken } from "../utils/jwt";

export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return next(new ApiError(401, "Unauthorized"));
  }

  try {
    const payload = verifyToken(token);
    req.user = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
    next();
  } catch (_error) {
    next(new ApiError(401, "Invalid or expired token"));
  }
};

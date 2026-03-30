import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError";

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.issues,
    });
  }

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      message: error.code === "LIMIT_FILE_SIZE" ? "Image must be 5MB or smaller" : error.message,
    });
  }

  if (error instanceof Error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
};

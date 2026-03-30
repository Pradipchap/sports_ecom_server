import { Role } from "@prisma/client";
import { Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { env, isProduction } from "../config/env";

type JwtPayload = {
  id: string;
  email: string;
  role: Role;
};

export const signToken = (payload: JwtPayload): string => {
  const options: SignOptions = {
    expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, env.jwtSecret, options);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.jwtSecret) as JwtPayload;
};

export const setAuthCookie = (res: Response, token: string): void => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};

export const clearAuthCookie = (res: Response): void => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
};

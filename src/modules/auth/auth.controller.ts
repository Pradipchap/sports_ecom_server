import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { clearAuthCookie, setAuthCookie } from "../../utils/jwt";
import { authService } from "./auth.service";
import { loginSchema, signupSchema } from "./auth.validation";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const parsed = signupSchema.parse(req.body);
  const data = await authService.signup(parsed);
  setAuthCookie(res, data.token);

  res.status(201).json({
    message: "Signup successful",
    user: data.user,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const parsed = loginSchema.parse(req.body);
  const data = await authService.login(parsed);
  setAuthCookie(res, data.token);

  res.json({
    message: "Login successful",
    user: data.user,
  });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.me(req.user!.id);
  res.json({ user });
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  clearAuthCookie(res);
  res.json({ message: "Logout successful" });
});

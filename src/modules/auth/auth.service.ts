import { Role, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/ApiError";
import { signToken } from "../../utils/jwt";

type SignupInput = {
  name: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

type SafeUser = Omit<User, "password">;

const toSafeUser = (user: User): SafeUser => {
  const { password: _password, ...safeUser } = user;
  return safeUser;
};

const issueAuthPayload = (user: User) => ({
  user: toSafeUser(user),
  token: signToken({
    id: user.id,
    email: user.email,
    role: user.role as Role,
  }),
});

export const authService = {
  async signup(input: SignupInput) {
    const existing = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existing) {
      throw new ApiError(409, "Email already in use");
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: hashedPassword,
      },
    });

    await prisma.cart.create({
      data: { userId: user.id },
    });

    return issueAuthPayload(user);
  },

  async login(input: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    const validPassword = await bcrypt.compare(input.password, user.password);
    if (!validPassword) {
      throw new ApiError(401, "Invalid credentials");
    }

    return issueAuthPayload(user);
  },

  async me(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return toSafeUser(user);
  },
};

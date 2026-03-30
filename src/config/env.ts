import dotenv from "dotenv";

dotenv.config();

const getEnv = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }
  return value;
};

export const env = {
  nodeEnv: getEnv("NODE_ENV", "development"),
  port: Number(getEnv("PORT", "5000")),
  databaseUrl: getEnv("DATABASE_URL"),
  jwtSecret: getEnv("JWT_SECRET"),
  jwtExpiresIn: getEnv("JWT_EXPIRES_IN", "7d"),
  clientUrl: getEnv("CLIENT_URL", "http://localhost:3000"),
};

export const isProduction = env.nodeEnv === "production";

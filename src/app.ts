import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";
import { env } from "./config/env";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";
import { appRouter } from "./routes";

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/", appRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

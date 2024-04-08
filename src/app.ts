import { loadEnv } from "@/config";
import cors from "cors";
import express, { Express, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import createError from "http-errors";

import "express-async-errors";
import { productRouter } from "@/routers";
import { clientRouter } from "./routers/client-router";

loadEnv();

const app: Express = express();
app
  .use(cors())
  .use(express.json())
  .use(cookieParser())
  .use(morgan("dev"))
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/produtos", productRouter)
  .use("/clientes", clientRouter)
  .use((_req, _res, next) => {
    next(createError(404));
  });

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

export default app;

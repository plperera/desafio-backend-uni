import { loadEnv } from "@/config";
import cors from "cors";
import express, { Express } from "express";

import "express-async-errors";
import { productRouter } from "@/routers";

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/product", productRouter)

export default app;

import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "..", "..", ".env"),
});

import express, { json, urlencoded } from "express";
import config from "config";
import cors, { CorsOptions } from "cors";
import "express-async-errors";
import helmet from "helmet";

import { authRouter } from "@components/auth";
import { passport } from "@components/passport";
import { specs, swaggerUi } from "@components/swagger";
import { errorFactory, errorMiddleware } from "@lib/error-manager";
import { logger, loggerMiddleware } from "@lib/log-manager";
import { Config } from "@typings/config";

const appConfig = config.get<Config["app"]>("app");
const ENV = config.util.getEnv("NODE_ENV");

const app = express();

const corsConfig: CorsOptions =
  ENV === "production"
    ? {
        origin: [appConfig.clientUrl],
        credentials: true,
      }
    : {};

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors(corsConfig));
app.use(helmet());

if (ENV === "production") {
  app.set("trust proxy", true);
}

app.use(loggerMiddleware);

passport.init(app);

app.use("/auth", authRouter);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/docs.json", (_, res) => {
  res.json(specs);
});

app.get("/_health", (_, res) => {
  res.send("OK");
});

app.get("/", (_, res) => {
  logger.info("Hello World!");

  res.send("Hello World!");
});

app.get("/error", () => {
  throw errorFactory.createBadRequestError("This is a bad request");
});

app.all("*", () => {
  throw errorFactory.createNotFoundError("The route that you have requested does not exist");
});

app.use(errorMiddleware);

export { app };

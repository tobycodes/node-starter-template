import http from "node:http";
import os from "node:os";
import cluster from "node:cluster";
import config from "config";
import "reflect-metadata";

import { getDataSource } from "@components/db/data-source";
import { logger } from "@lib/log-manager";
import { Config } from "@typings/config";

import { app } from "./app";
import { terminate } from "./app/terminate";

const appConfig = config.get<Config["app"]>("app");
const ENV = config.util.getEnv("NODE_ENV");

const server = http.createServer(app);

const exitHandler = terminate(server, { coredump: appConfig.coredump, timeout: appConfig.timeout });

const main = () => {
  const dataSource = getDataSource();

  dataSource
    .initialize()
    .then(async () => {
      logger.info("Data source is initialized");

      server.listen(appConfig.port, () => {
        logger.info(`Server is listening on port ${appConfig.port}`);
      });

      server.on("error", (error) => {
        logger.error(error);
        exitHandler(1, "Server Error");
      });

      server.on("close", async () => {
        logger.info("Server is closed. Destroying data source");

        await dataSource.destroy();

        logger.info("Data source is destroyed");
      });
    })
    .catch((err) => {
      logger.error(err);
      exitHandler(1, "Data source failed to initialize");
    });

  process.on("uncaughtException", exitHandler(1, "Uncaught Error"));
  process.on("unhandledRejection", exitHandler(1, "Unhandled Promise"));
  process.on("SIGTERM", exitHandler(0, "SIGTERM"));
  process.on("SIGINT", exitHandler(0, "SIGINT"));
};

if (cluster.isPrimary && ENV === "production") {
  const cpuCount = os.cpus().length;

  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    logger.info(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  main();
}

import config from "config";
import { default as pino } from "pino";
import type { LoggerOptions } from "pino";

import { loggerContext } from "./async-context";

const ENV = config.util.getEnv("NODE_ENV");
const appName = config.get<string>("app.name");

const baseOpts: LoggerOptions = {
  name: appName,
  redact: ["req.headers.authorization", "*.password", "*.repeatPassword"],
  enabled: ENV !== "test",
};

const devOpts: LoggerOptions = {
  ...baseOpts,
  level: "debug",
  transport: { target: "pino-pretty", options: { colorize: true } },
};

const prodOpts: LoggerOptions = { ...baseOpts, level: "info" };

const loggerInstance = pino(ENV === "production" ? prodOpts : devOpts);

const loggerProxy = new Proxy(loggerInstance, {
  get(target, prop, receiver) {
    target = loggerContext.getStore()?.get("logger") || target;

    return Reflect.get(target, prop, receiver);
  },
});

export { loggerProxy, loggerInstance };

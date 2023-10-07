import { Handler } from "express";
import type { Logger } from "pino";
import { v4 as uuid } from "uuid";

import { loggerContext } from "./async-context";
import { loggerInstance } from "./logger";

const loggerMiddleware: Handler = (req, _2, next) => {
  const child = loggerInstance.child({ requestId: uuid() });
  const store = new Map<string, Logger>();

  store.set("logger", child);

  child.info(`Request to ${req.url} with method ${req.method} started`);

  return loggerContext.run(store, next, "route");
};

export { loggerMiddleware };

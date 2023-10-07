import { AsyncLocalStorage } from "node:async_hooks";
import type { Logger } from "pino";

const loggerContext = new AsyncLocalStorage<Map<string, Logger>>();

export { loggerContext };

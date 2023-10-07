import type { Server } from "node:http";

import { logger } from "@lib/log-manager";

export function terminate(server: Server, options: { coredump?: boolean; timeout: number }) {
  const exit = (code: number) => {
    options.coredump ? process.abort() : process.exit(code);
  };

  return (code: number, reason: string) => (err: Error, _promise?: Promise<unknown>) => {
    logger.warn(`Process ${process.pid} exiting with code ${code} due to ${reason}`);

    if (err && err instanceof Error) {
      logger.error(err.message, err.stack);
    }

    server.close(() => exit(code));

    setTimeout(() => exit(code), options.timeout).unref();
  };
}

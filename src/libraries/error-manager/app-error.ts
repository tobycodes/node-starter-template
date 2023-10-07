import { ErrorName, HttpCode } from "./constants";

class AppError extends Error {
  constructor(
    public name: ErrorName,
    public httpCode: HttpCode,
    public description: string,
    public isOperational: boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public data?: any
  ) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this);
  }
}

export { AppError };

/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppError } from "./app-error";
import { ErrorName, HttpCode, ErrorConstants } from "./constants";

class ErrorFactory {
  public createBadRequestError(message: string, data?: any): AppError {
    return this.createAppError(
      ErrorConstants.names.badRequestError,
      ErrorConstants.httpCodes.badRequest,
      message,
      true,
      data
    );
  }

  public createConflictError(message: string, data?: any): AppError {
    return this.createAppError(
      ErrorConstants.names.conflictError,
      ErrorConstants.httpCodes.conflict,
      message,
      true,
      data
    );
  }

  public createForbiddenError(message: string, data?: any): AppError {
    return this.createAppError(
      ErrorConstants.names.forbiddenError,
      ErrorConstants.httpCodes.forbidden,
      message,
      true,
      data
    );
  }

  public createInternalServerError(message: string, data?: any): AppError {
    return this.createAppError(
      ErrorConstants.names.internalServerError,
      ErrorConstants.httpCodes.internalServerError,
      message,
      false,
      data
    );
  }

  public createNotFoundError(message: string, data?: any): AppError {
    return this.createAppError(
      ErrorConstants.names.notFoundError,
      ErrorConstants.httpCodes.notFound,
      message,
      true,
      data
    );
  }

  public createUnauthorizedError(message: string, data?: any): AppError {
    return this.createAppError(
      ErrorConstants.names.unauthorizedError,
      ErrorConstants.httpCodes.unauthorized,
      message,
      true,
      data
    );
  }

  public createValidationError(message: string, data?: any): AppError {
    return this.createAppError(
      ErrorConstants.names.validationError,
      ErrorConstants.httpCodes.badRequest,
      message,
      true,
      data
    );
  }

  public createAppError(
    name: ErrorName,
    httpCode: HttpCode,
    message: string,
    isOperational: boolean,
    data?: any
  ): AppError {
    return new AppError(name, httpCode, message, isOperational, data);
  }
}

const errorFactory = new ErrorFactory();

export { errorFactory };

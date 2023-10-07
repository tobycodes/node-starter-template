export class ErrorConstants {
  static readonly names = {
    appError: "AppError",
    validationError: "ValidationError",
    notFoundError: "NotFoundError",
    unauthorizedError: "UnauthorizedError",
    forbiddenError: "ForbiddenError",
    badRequestError: "BadRequestError",
    conflictError: "ConflictError",
    internalServerError: "InternalServerError",
    serviceUnavailableError: "ServiceUnavailableError",
    gatewayTimeoutError: "GatewayTimeoutError",
    tooManyRequestsError: "TooManyRequestsError",
    unprocessableEntityError: "UnprocessableEntityError",
    notImplementedError: "NotImplementedError",
    badGatewayError: "BadGatewayError",
    databaseError: "DatabaseError",
  } as const;

  static readonly httpCodes = {
    notFound: 404,
    unauthorized: 401,
    forbidden: 403,
    badRequest: 400,
    conflict: 409,
    internalServerError: 500,
    serviceUnavailable: 503,
    gatewayTimeout: 504,
    tooManyRequests: 429,
    unprocessableEntity: 422,
    notImplemented: 501,
    badGateway: 502,
  } as const;
}

export type ErrorName = (typeof ErrorConstants.names)[keyof typeof ErrorConstants.names];

export type HttpCode = (typeof ErrorConstants.httpCodes)[keyof typeof ErrorConstants.httpCodes];

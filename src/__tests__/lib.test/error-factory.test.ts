import { ErrorConstants, errorFactory } from "@lib/error-manager";

describe("errorFactory", () => {
  describe("createBadRequestError", () => {
    it("should create an operational bad request error with the provided message and status 400", () => {
      const message = "This is an error message";
      const error = errorFactory.createBadRequestError(message);

      expect(error.name).toBe(ErrorConstants.names.badRequestError);
      expect(error.httpCode).toBe(ErrorConstants.httpCodes.badRequest);
      expect(error.message).toBe(message);
      expect(error.isOperational).toBe(true);
    });
  });

  describe("createForbiddenError", () => {
    it("should create an operational forbidden error with the provided message and status 403", () => {
      const message = "This is an error message";
      const error = errorFactory.createForbiddenError(message);

      expect(error.name).toBe(ErrorConstants.names.forbiddenError);
      expect(error.httpCode).toBe(ErrorConstants.httpCodes.forbidden);
      expect(error.message).toBe(message);
      expect(error.isOperational).toBe(true);
    });
  });

  describe("createInternalServerError", () => {
    it("should create a non-operational internal server error with the provided message and status 500", () => {
      const message = "This is an error message";
      const error = errorFactory.createInternalServerError(message);

      expect(error.name).toBe(ErrorConstants.names.internalServerError);
      expect(error.httpCode).toBe(ErrorConstants.httpCodes.internalServerError);
      expect(error.message).toBe(message);
      expect(error.isOperational).toBe(false);
    });
  });

  describe("createNotFoundError", () => {
    it("should create an operational not found error with the provided message and status 404", () => {
      const message = "This is an error message";
      const error = errorFactory.createNotFoundError(message);

      expect(error.name).toBe(ErrorConstants.names.notFoundError);
      expect(error.httpCode).toBe(ErrorConstants.httpCodes.notFound);
      expect(error.message).toBe(message);
      expect(error.isOperational).toBe(true);
    });
  });

  describe("createUnauthorizedError", () => {
    it("should create an operational unauthorized error with the provided message and status 401", () => {
      const message = "This is an error message";
      const error = errorFactory.createUnauthorizedError(message);

      expect(error.name).toBe(ErrorConstants.names.unauthorizedError);
      expect(error.httpCode).toBe(ErrorConstants.httpCodes.unauthorized);
      expect(error.message).toBe(message);
      expect(error.isOperational).toBe(true);
    });
  });

  describe("createValidationError", () => {
    it("should create an operational validation error with the provided message and status 400", () => {
      const message = "This is an error message";
      const error = errorFactory.createValidationError(message);

      expect(error.name).toBe(ErrorConstants.names.validationError);
      expect(error.httpCode).toBe(ErrorConstants.httpCodes.badRequest);
      expect(error.message).toBe(message);
      expect(error.isOperational).toBe(true);
    });
  });
});

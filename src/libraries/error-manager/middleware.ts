import { ErrorRequestHandler } from "express";

import { logger } from "@lib/log-manager";

import { AppError } from "./app-error";

/**
 * @openapi
 * components:
 *  schemas:
 *   ErrorDto:
 *    type: object
 *    properties:
 *      error:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            required: true
 *            description: The name of the error
 *          message:
 *            type: string
 *            required: true
 *            description: The description of the error
 *      data:
 *        type: array
 *        required: false
 *        description: The data of the error
 *        items:
 *          type: object
 *          properties:
 *            field:
 *              type: string
 *              required: true
 *              description: The field of the error
 *            message:
 *              type: string
 *              required: true
 *              description: The message of the error
 */
const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  logger.info("error middleware called");

  if (err instanceof AppError) {
    logger.info("error instance of AppError");
    const { stack: _, ...error } = err;

    logger.error(error);

    res.status(err.httpCode).json({
      error: { name: err.name, message: err.description },
      data: err.data,
    });

    if (!err.isOperational) {
      throw err;
    }
  } else {
    logger.info("error not instance of AppError");
    throw err;
  }
};

export { errorMiddleware };

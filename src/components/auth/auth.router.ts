import { ErrorRequestHandler, Handler, Router } from "express";

import { passport } from "@components/passport";
import { uploadSingleFieldAndFile } from "@lib/file-storage/middlewares";
import { logger } from "@lib/log-manager";

import * as controller from "./auth.controller";
import { AppError } from "@lib/error-manager/app-error";
import { validateNotSignedIn } from "./auth.middlewares";

const authRouter = Router();

/**
 * @openapi
 * /auth/register:
 *  post:
 *    summary: Register a new user
 *    tags:
 *      - Auth
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/RegisterDto'
 *    responses:
 *      200:
 *        description: User registered successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  type: object
 *                  $ref: '#/components/schemas/User'
 *      400:
 *        description: Error with data supplied
 *        content:
 *          application/json:
 *           schema:
 *            type: object
 *            $ref: '#/components/schemas/ErrorDto'
 *      409:
 *        description: Conflict - User already exists
 *        content:
 *          application/json:
 *           schema:
 *            type: object
 *            $ref: '#/components/schemas/ErrorDto'
 */
authRouter.post("/register", validateNotSignedIn, uploadSingleFieldAndFile("avatar"), controller.registerUser);

const localLoginHandler: Handler = (req, res, _) => {
  logger.info(req.body, "Logged in user with password");

  return res.json({ message: "User logged in" });
};

const localLoginErrorHandler: ErrorRequestHandler = (err: AppError, _, res, _2) => {
  logger.debug("Login with email and password failed");

  return res.status(err.httpCode).json({
    error: { name: err.name, message: "Email or password incorrect" },
  });
};

/**
 * @openapi
 * /auth/login/password:
 *  post:
 *    summary: Login with email and password
 *    tags:
 *      - Auth
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/LoginDto'
 *    responses:
 *      200:
 *        description: >
 *           User logged in successfully
 *           The session ID is returned in a cookie named `session`. You need to include this cookie in subsequent requests
 *        headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: session=abcde12345; Path=/; HttpOnly
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: The message of the response
 *      400:
 *        description: Error with data supplied
 *        content:
 *          application/json:
 *           schema:
 *            type: object
 *            $ref: '#/components/schemas/ErrorDto'
 */
authRouter.post(
  "/login/password",
  validateNotSignedIn,
  passport.authenticateLocal(),
  localLoginHandler,
  localLoginErrorHandler
);

authRouter.post("/logout", (req, res) => {
  req.logout({ keepSessionInfo: false }, (err) => {
    if (err) {
      logger.error(err, "Error logging out user");
      return res.status(500).json({ message: "Error logging out user" });
    }

    logger.info("Logged out user");
  });

  res.json({ message: "User logged out" });
});

export { authRouter };

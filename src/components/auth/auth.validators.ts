import { ajv } from "@lib/validator";

import { RegisterDto } from "./auth.dto";

/**
 * @openapi
 * components:
 *  schemas:
 *   RegisterDto:
 *    type: object
 *    properties:
 *      firstName:
 *        type: string
 *        required: true
 *      lastName:
 *         type: string
 *         required: true
 *      email:
 *        type: string
 *        required: true
 *      password:
 *         type: string
 *         required: true
 *         pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,32})"
 *      repeatPassword:
 *         type: string
 *         required: true
 *         $ref: '#/components/schemas/RegisterDto/properties/password'
 *      phone:
 *       type: string
 *       required: false
 *      avatar:
 *        type: image
 *        required: false
 *      location:
 *        type: object
 *        required: true
 *        properties:
 *          lat:
 *            type: number
 *            required: true
 *            description: The latitude of the user
 *          lng:
 *             type: number
 *             required: true
 *             description: The longitude of the user
 *          city:
 *            type: string
 *            required: true
 *            description: The city of the user
 *          state:
 *            type: string
 *            required: true
 *            description: The state of the user
 */
const registerUserSchema = {
  type: "object",
  properties: {
    firstName: { type: "string", minLength: 2, maxLength: 50 },
    lastName: { type: "string", minLength: 2, maxLength: 50 },
    email: { type: "string", format: "email" },
    phone: { type: "string", minLength: 10, maxLength: 30, nullable: true },
    password: {
      type: "string",
      minLength: 8,
      maxLength: 32,
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,32})",
    },
    repeatPassword: {
      const: { $data: "1/password" },
      type: "string",
    },
    location: {
      type: "object",
      properties: {
        lat: { type: "number" },
        lng: { type: "number" },
        city: { type: "string" },
        state: { type: "string" },
      },
      required: ["lat", "lng", "city", "state"],
      additionalProperties: false,
    },
  },
  required: ["firstName", "lastName", "email", "password", "repeatPassword"],
};

const registerValidator = ajv.compile(registerUserSchema);

export const validateRegister = (registerDto: RegisterDto) => {
  const isValid = registerValidator(registerDto);

  return { isValid, errors: registerValidator.errors };
};

/**
 * @openapi
 * components:
 *  schemas:
 *    LoginDto:
 *     type: object
 *     properties:
 *      email:
 *        type: string
 *        required: true
 *      password:
 *        type: string
 *        required: true
 */
const loginUserSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 8, maxLength: 32 },
  },
  required: ["email", "password"],
};

const loginValidator = ajv.compile(loginUserSchema);

export const validateLogin = (loginDto: RegisterDto) => {
  const isValid = loginValidator(loginDto);

  return { isValid, errors: loginValidator.errors };
};

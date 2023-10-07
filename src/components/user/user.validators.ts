import type { JSONSchemaType } from "ajv";
import { createValidator } from "@lib/validator";

import { UserDto } from "./user.dto";
import { locationSchema } from "@components/location";

const userSchema: JSONSchemaType<UserDto> = {
  type: "object",
  properties: {
    firstName: { type: "string", minLength: 2, maxLength: 50 },
    lastName: { type: "string", minLength: 2, maxLength: 50 },
    email: { type: "string", format: "email" },
    password: { type: "string", format: "password", minLength: 8 },
    phone: { type: "string", minLength: 10, maxLength: 30, nullable: true },
    avatarId: { type: "number", nullable: true },
    location: { ...locationSchema, nullable: true },
  },
  required: ["firstName", "lastName", "email", "password"],
  additionalProperties: false,
};

const validateUser = createValidator<UserDto>(userSchema);

export { validateUser };

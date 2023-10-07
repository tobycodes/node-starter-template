import fs from "node:fs";
import { promisify } from "node:util";
import { RequestHandler } from "express";
import * as argon2 from "argon2";

import { ImageService } from "@components/image";
import { UserService } from "@components/user";
import { errorFactory } from "@lib/error-manager";
import { logger } from "@lib/log-manager";
import { transformErrors } from "@lib/validator";

import { validateRegister } from "./auth.validators";

const fsUnlink = promisify(fs.unlink);

const registerUser: RequestHandler = async (req) => {
  logger.info(req.body, "Registering new user");

  const { isValid, errors } = validateRegister(req.body);

  if (!isValid) {
    const errorsDto = errors ? transformErrors(errors) : null;
    throw errorFactory.createValidationError("Error with data supplied", errorsDto);
  }

  const { repeatPassword: _, password, ...dto } = req.body;

  if (req.file) {
    try {
      const avatar = req.file;
      const { id } = await ImageService.createImage(avatar);
      dto.avatarId = id;

      await fsUnlink(avatar.path);
    } catch (error) {
      throw errorFactory.createInternalServerError("Error creating user avatar", error);
    }
  }

  dto.password = await argon2.hash(password, { saltLength: 16 });

  const user = await UserService.createUser(dto);
  const sessionPayload = { id: user.id, email: user.email, updatedAt: user.updatedAt };

  return req.login(sessionPayload, (err) => {
    if (err) {
      throw errorFactory.createInternalServerError("Error logging in newly registered user", err);
    }
  });
};

export { registerUser };

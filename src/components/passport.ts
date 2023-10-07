import * as argon2 from "argon2";
import config from "config";
import session from "cookie-session";
import { Express } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { UserService } from "@components/user";
import { errorFactory } from "@lib/error-manager";

const ENV = config.util.getEnv("NODE_ENV");
const SECRET = config.util.getEnv("SECRET");

class PassportSetup {
  public init(app: Express) {
    app.use(
      session({
        secret: SECRET || "secret",
        secure: ENV === "production",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    );

    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser(async (user: Express.User, done) => {
      done(null, user);
    });

    this.setupLocalStrategy();

    app.use(passport.initialize());
    app.use(passport.session());
  }

  private setupLocalStrategy() {
    passport.use(
      new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
          const user = await UserService.getUserByEmail(email, { include: ["password"] });

          if (!user) {
            throw errorFactory.createBadRequestError("Email or password incorrect");
          }

          const passwordMatch = await argon2.verify(user.password, password);

          if (!passwordMatch) {
            throw errorFactory.createBadRequestError("Email or password incorrect");
          }

          const sessionPayload = { id: user.id, email: user.email, updatedAt: user.updatedAt };

          return done(null, sessionPayload);
        } catch (error) {
          return done(error);
        }
      })
    );
  }

  public authenticateLocal() {
    return passport.authenticate("local", { failWithError: true });
  }
}

const instance = new PassportSetup();

export { instance as passport };

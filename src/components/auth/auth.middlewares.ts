import { Handler } from "express";

import { errorFactory } from "@lib/error-manager";

const validateNotSignedIn: Handler = (req, _, next) => {
  const isLoggedIn = req.user && req.isAuthenticated();

  if (isLoggedIn) {
    throw errorFactory.createBadRequestError("You are already signed in");
  }

  next();
};

const validateSignedIn: Handler = (req, _, next) => {
  const isNotLoggedIn = !req.user || !req.isUnauthenticated();

  if (isNotLoggedIn) {
    throw errorFactory.createUnauthorizedError("You are not signed in");
  }

  next();
};

export { validateNotSignedIn, validateSignedIn };

import { expressjwt } from "express-jwt";

import HttpError from "../models/http-error.js";
import User from "../models/user.js";
import { GET_USER_FAILED, NO_MATCH_BY_USER_ID } from "../utils/constants.js";

const secret = process.env.JWT_SECRET;

export const authMiddleware = expressjwt({
  algorithms: ["HS256"],
  credentialsRequired: false,
  secret,
});

// Context fn to pass User data to graphQL resolvers
export const getContext = async ({ req }) => {
  if (!req || !req.auth) {
    // if no context return empty object
    return {};
  }
  const authorId = req.auth.userId;

  let user;
  try {
    user = await User.findById(authorId);
  } catch (_err) {
    const error = new HttpError(GET_USER_FAILED, 500);
    throw error;
  }

  if (!user) {
    const error = new HttpError(NO_MATCH_BY_USER_ID, 404);
    throw error;
  }

  return {
    user,
  };
};

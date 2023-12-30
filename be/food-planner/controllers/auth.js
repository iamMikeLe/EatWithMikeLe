import bcrypt from "bcryptjs";
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";

import HttpError from "../models/http-error.js";
import User from "../models/user.js";
import {
  GET_USER_FAILED,
  INVALID_INPUT,
  LOGIN_FAILED,
  NO_MATCH_BY_USER_ID,
  SIGNUP_FAILED_TOKEN_GENERATION,
} from "../utils/constants.js";

const secret = process.env.JWT_SECRET;

export const authMiddleware = expressjwt({
  algorithms: ["HS256"],
  credentialsRequired: false,
  secret,
});

// Context fn to pass User data to graphQL resolvers
export const getContext = async ({ req }) => {
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

// TODO: Move to users controller
export async function handleLogin(req, res, next) {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(LOGIN_FAILED, 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(INVALID_INPUT, 401);
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(INVALID_INPUT, 500);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(INVALID_INPUT, 401);
    return next(error);
  }

  let token;
  try {
    token = await jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(SIGNUP_FAILED_TOKEN_GENERATION, 500);
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token,
  });
}

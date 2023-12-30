import bcrypt from "bcryptjs";
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";

import HttpError from "../models/http-error.js";
import User from "../models/user.js";
import {
  INVALID_INPUT,
  LOGIN_FAILED,
  SIGNUP_FAILED_TOKEN_GENERATION,
} from "../utils/constants.js";

const secret = Buffer.from(process.env.JWT_SECRET, "base64");

export const authMiddleware = expressjwt({
  algorithms: ["HS256"],
  credentialsRequired: false,
  secret,
});

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

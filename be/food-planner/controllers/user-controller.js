import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import HttpError from "../models/http-error.js";
import User from "../models/user.js";
import {
  CREATE_USER_FAILED,
  CREATING_USER_FAILED,
  GET_USER_BY_ID_FAILED,
  GET_USER_FAILED,
  INVALID_INPUT,
  LOGIN_FAILED,
  SIGNUP_FAILED_TOKEN_GENERATION,
} from "../utils/constants.js";

export const getUsers = async () => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(GET_USER_FAILED, 500);
    throw error;
  }
  return users.map((user) => user.toObject({ getters: true }));
};

export const getUsersById = async (userId) => {
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(GET_USER_FAILED, 500);
    throw error;
  }

  if (!user) return new HttpError(GET_USER_BY_ID_FAILED, 404);

  return user.toObject({ getters: true });
};

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

export const createUser = async ({
  firstName,
  lastName,
  email,
  password,
  avatar,
}) => {
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (_err) {
    const error = new HttpError(CREATING_USER_FAILED, 500);
    throw error;
  }

  const createdUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    avatar,
    favorites: [],
    learned: [],
    meals: [],
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(CREATE_USER_FAILED, 500);
    throw error;
  }
  return createdUser.toObject({ getters: true });
};

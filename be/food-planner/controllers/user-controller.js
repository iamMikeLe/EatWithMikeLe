import bcrypt from "bcryptjs";
import HttpError from "../models/http-error.js";
import User from "../models/user.js";
import {
  CREATE_USER_FAILED,
  CREATING_USER_FAILED,
  GET_USER_BY_ID_FAILED,
  GET_USER_FAILED,
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

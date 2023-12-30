import HttpError from "../models/http-error.js";
import User from "../models/user.js";
import constants from "../utils/constants.js";

export const createUser = async ({
  firstName,
  lastName,
  email,
  password,
  avatar,
}) => {
  const createdUser = new User({
    firstName,
    lastName,
    email,
    password,
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
    const error = new HttpError(constants.CREATE_USER_FAILED, 500);
    throw error;
  }
  return createdUser.toObject({ getters: true });
};

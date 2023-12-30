import HttpError from "../models/http-error.js";
import User from "../models/user.js";
import constants from "../utils/constants.js";

export const getUsers = async () => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(constants.GET_USER_FAILED, 500);
    throw error;
  }
  return users.map((user) => user.toObject({ getters: true }));
};

export const getUsersById = async (userId) => {
  let user;
  try {
    user = await User.findById(userId);
    console.log("user", user);
  } catch (err) {
    const error = new HttpError(constants.GET_USER_FAILED, 500);
    throw error;
  }

  if (!user) return new HttpError(constants.GET_USER_BY_ID_FAILED, 404);

  return user.toObject({ getters: true });
};

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

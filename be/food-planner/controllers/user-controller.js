import HttpError from "../models/http-error.js";
import User from "../models/user.js";

export const createUser = async ({
  firstName,
  lastName,
  email,
  password,
  avatar,
  favorites,
  learned,
  createdAt,
  modifiedAt,
}) => {
  const createdUser = new User({
    firstName,
    lastName,
    email,
    password,
    avatar,
    favorites,
    learned,
    createdAt,
    modifiedAt,
  });

  try {
    await createdUser.save();
    console.log("user created successfully", createdUser);
  } catch (err) {
    const error = new HttpError("constants.CREATE_USER_FAILED", 500);
    console.log("error creating user", error);
  }
  return createdUser.toObject({ getters: true });
};

import mongoose from "mongoose";
import HttpError from "../models/http-error.js";
import Meal from "../models/meal.js";
import User from "../models/user.js";
import constants from "../utils/constants.js";

export const getAllMeals = async () => {
  let meals;
  try {
    meals = await Meal.find();
  } catch (err) {
    const error = new HttpError(constants.GET_ALL_MEALS_FAILED, 500);
    throw error;
  }
  return meals.map((meal) => meal.toObject({ getters: true }));
};

export const createMeal = async ({
  title,
  description,
  imageUrl,
  tags,
  // author,
}) => {
  const AuthorId = "6589922d23d4d9220d665d1c";
  const createdMeal = new Meal({
    title,
    description,
    imageUrl,
    tags,
    author: AuthorId,
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
  });

  let user;
  try {
    user = await User.findById(AuthorId);
  } catch (err) {
    const error = new HttpError(constants.CREATING_MEAL_FAILED, 500);
    throw error;
  }

  if (!user) {
    const error = new HttpError(constants.NO_MATCH_BY_ID, 404);
    throw error;
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdMeal.save({ session: sess });
    user.meals.push(createdMeal);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(constants.CREATING_MEAL_FAILED, 500);
    throw error;
  }

  return createdMeal.toObject({ getters: true });
};

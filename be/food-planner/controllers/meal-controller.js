import mongoose from "mongoose";
import HttpError from "../models/http-error.js";
import Meal from "../models/meal.js";
import User from "../models/user.js";
import constants from "../utils/constants.js";

// ------------------------------------------------------------
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

// ------------------------------------------------------------
export const getMealById = async (mealId) => {
  let meal;
  try {
    meal = await Meal.findById(mealId);
  } catch (err) {
    const error = new HttpError(constants.GET_MEAL_BY_ID_FAILED, 500);
    throw error;
  }

  if (!meal) return new HttpError(constants.GET_MEAL_BY_ID_FAILED, 404);

  return meal.toObject({ getters: true });
};

// ------------------------------------------------------------
export const getMealByUserId = async (userId) => {
  let userWithMeals;
  try {
    userWithMeals = await User.findById(userId).populate("meals");
  } catch (err) {
    const error = new HttpError(constants.GET_ALL_MEALS_BY_USER_FAILED, 500);
    throw error;
  }

  if (!userWithMeals || userWithMeals.meals.length === 0) {
    throw new HttpError(
      constants.COULD_NOT_FIND_MATCH_BY_PROVIDED_USER_ID,
      404
    );
  }
  return userWithMeals.meals.map((meal) => meal.toObject({ getters: true }));
};

// ------------------------------------------------------------
export const createMeal = async ({
  title,
  description,
  imageUrl,
  tags,
  author,
}) => {
  const createdMeal = new Meal({
    title,
    description,
    imageUrl,
    tags,
    author,
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
  });

  let user;
  try {
    user = await User.findById(author);
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

// ------------------------------------------------------------
export const deleteMealById = async (mealId, userId) => {
  let meal;
  try {
    meal = await Meal.findById(mealId).populate("author");
  } catch (err) {
    const error = new HttpError(
      constants.COULD_NOT_FIND_MATCH_BY_PROVIDED_MEAL_ID,
      500
    );
    throw error;
  }

  if (!meal) {
    const error = new HttpError(
      constants.COULD_NOT_FIND_MATCH_BY_PROVIDED_MEAL_ID,
      404
    );
    throw error;
  }

  if (meal.author.id.toString() !== userId) {
    const error = new HttpError(constants.UNAUTHORIZED, 401);
    throw error;
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await meal.deleteOne({ session: sess });
    meal.author.meals.pull(meal);
    await meal.author.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(constants.DELETE_MEAL_FAILED, 500);
    throw error;
  }

  return { message: constants.DELETE_MEAL_SUCCESS };
};

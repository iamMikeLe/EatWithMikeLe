import mongoose from "mongoose";
import HttpError from "../models/http-error.js";
import Meal from "../models/meal.js";
import User from "../models/user.js";
import {
  COULD_NOT_FIND_MATCH_BY_PROVIDED_MEAL_ID,
  COULD_NOT_FIND_MATCH_BY_PROVIDED_USER_ID,
  CREATING_MEAL_FAILED,
  DELETE_MEAL_FAILED,
  DELETE_MEAL_SUCCESS,
  GET_ALL_MEALS_BY_USER_FAILED,
  GET_ALL_MEALS_FAILED,
  GET_MEAL_BY_ID_FAILED,
  UNAUTHORIZED,
} from "../utils/constants.js";

// ------------------------------------------------------------
export const getAllMeals = async () => {
  let meals;
  try {
    meals = await Meal.find();
  } catch (_err) {
    const error = new HttpError(GET_ALL_MEALS_FAILED, 500);
    throw error;
  }
  return meals.map((meal) => meal.toObject({ getters: true }));
};

// ------------------------------------------------------------
export const getMealById = async (mealId) => {
  let meal;
  try {
    meal = await Meal.findById(mealId);
  } catch (_err) {
    const error = new HttpError(GET_MEAL_BY_ID_FAILED, 500);
    throw error;
  }

  if (!meal) return new HttpError(GET_MEAL_BY_ID_FAILED, 404);

  return meal.toObject({ getters: true });
};

// ------------------------------------------------------------
export const getMealByUserId = async (userId) => {
  let userWithMeals;
  try {
    userWithMeals = await User.findById(userId).populate("meals");
  } catch (_err) {
    const error = new HttpError(GET_ALL_MEALS_BY_USER_FAILED, 500);
    throw error;
  }

  if (!userWithMeals || userWithMeals.meals.length === 0) {
    throw new HttpError(COULD_NOT_FIND_MATCH_BY_PROVIDED_USER_ID, 404);
  }
  return userWithMeals.meals.map((meal) => meal.toObject({ getters: true }));
};

// ------------------------------------------------------------
export const createMeal = async (
  { title, description, imageUrl, tags },
  user
) => {
  const createdMeal = new Meal({
    title,
    description,
    imageUrl,
    tags,
    author: user.id,
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdMeal.save({ session: sess });
    user.meals.push(createdMeal);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (_err) {
    const error = new HttpError(CREATING_MEAL_FAILED, 500);
    throw error;
  }

  return createdMeal.toObject({ getters: true });
};

// ------------------------------------------------------------
export const deleteMealById = async (
  mealId,
  userId = "6589922d23d4d9220d665d1c" // will be extracted from token in future
) => {
  let meal;
  try {
    meal = await Meal.findById(mealId).populate("author");
  } catch (_err) {
    const error = new HttpError(COULD_NOT_FIND_MATCH_BY_PROVIDED_MEAL_ID, 500);
    return { message: error };
  }

  if (!meal) {
    const error = new HttpError(COULD_NOT_FIND_MATCH_BY_PROVIDED_MEAL_ID, 404);
    return { message: error };
  }

  if (meal.author.id.toString() !== userId) {
    const error = new HttpError(UNAUTHORIZED, 401);
    return { message: error };
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await meal.deleteOne({ session: sess });
    meal.author.meals.pull(meal);
    await meal.author.save({ session: sess });
    await sess.commitTransaction();
  } catch (_err) {
    const error = new HttpError(DELETE_MEAL_FAILED, 500);
    return { message: error };
  }

  return { deletedMealId: mealId, message: DELETE_MEAL_SUCCESS };
};

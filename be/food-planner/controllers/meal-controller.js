import HttpError from "../models/http-error.js";
import Meal from "../models/meal.js";

export const getAllMeals = async () => {
  let meals;
  try {
    meals = await Meal.find();
  } catch (err) {
    const error = new HttpError("constants.GET_ALL_MEALS_FAILED", 500);
    console.log("error", error);
  }
  return meals.map((meal) => meal.toObject({ getters: true }));
};

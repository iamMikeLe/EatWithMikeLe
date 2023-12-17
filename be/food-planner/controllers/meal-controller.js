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

export const createMeal = async ({
  title,
  description,
  imageUrl,
  tags,
  author,
  authorId,
}) => {
  const createdMeal = new Meal({
    title,
    description,
    imageUrl,
    tags,
    author,
    authorId,
  });

  try {
    await createdMeal.save();
  } catch (err) {
    const error = new HttpError("constants.CREATE_MEAL_FAILED", 500);
    console.log("error", error);
  }
  return createdMeal.toObject({ getters: true });
};

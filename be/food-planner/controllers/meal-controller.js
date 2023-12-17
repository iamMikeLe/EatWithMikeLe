import HttpError from "../models/http-error.js";
import Meal from "../models/meal.js";

export const getAllMeals = async () => {
  let meals;
  /*   const createdMeal = new Meal({
    title: "Gnochi",
    description: "potato gnochi with tomato sauce",
    imageUrl: "https://picsum.photos/320/190",
    tags: ["potato", "tomato", "vegetarian"],
    author: "Mike",
    authorId: "123456456",
  });

  try {
    await createdMeal.save();
  } catch (err) {
    const error = new HttpError("constants.CREATE_MEAL_FAILED", 500);
    console.log("error", error);
  }
 */
  try {
    meals = await Meal.find();
  } catch (err) {
    const error = new HttpError("constants.GET_ALL_MEALS_FAILED", 500);
    console.log("error", error);
  }
  return meals.map((meal) => meal.toObject({ getters: true }));
};

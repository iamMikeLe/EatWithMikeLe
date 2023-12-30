import {
  createMeal,
  getAllMeals,
  getMealById,
  getMealByUserId,
} from "./controllers/meal-controller.js";
import { getUsers, getUsersById } from "./controllers/user-controller.js";
import { dummyPlace, dummyPlaces } from "./utils/dummyData.js";

export const resolvers = {
  Query: {
    user: (_root, { id }) => getUsersById(id),

    users: () => getUsers(),

    meal: (_root, { id }) => getMealById(id),

    meals: () => getAllMeals(),

    place: (_root, { id }) => dummyPlace,

    places: () => dummyPlaces,
  },

  Mutation: {
    createMeal: (_root, { input }) => {
      return createMeal(input);
    },
  },

  User: {
    meals: (user) => getMealByUserId(user.id),
  },
};

import {
  createMeal,
  deleteMealById,
  getAllMeals,
  getMealById,
  getMealByUserId,
} from "./controllers/meal-controller.js";
import {
  createUser,
  getUsers,
  getUsersById,
} from "./controllers/user-controller.js";
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
    createUser: (_root, { input }) => createUser(input),
    createMeal: (_root, { input }) => createMeal(input),
    deleteMeal: (_root, { id }) => deleteMealById(id),
  },

  User: {
    meals: (user) => getMealByUserId(user.id),
  },
};

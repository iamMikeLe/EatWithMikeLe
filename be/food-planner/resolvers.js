import {
  createMeal,
  deleteMealById,
  getAllMeals,
  getMealById,
  getMealByUserId,
} from "./controllers/meal-controller.js";
import { generateUploadUrl } from "./controllers/s3.js";
import {
  createUser,
  getUsers,
  getUsersById,
} from "./controllers/user-controller.js";
// import { dummyPlace, dummyPlaces } from "./utils/dummyData.js";

export const resolvers = {
  Query: {
    user: (_root, { id }) => getUsersById(id),

    users: () => getUsers(),

    meal: (_root, { id }) => getMealById(id),

    meals: () => getAllMeals(),

    s3URL: (_root, _data, { user }) => generateUploadUrl(user),

    // place: (_root, { id }) => dummyPlace,

    // places: () => dummyPlaces,
  },

  Mutation: {
    createUser: (_root, { input }) => createUser(input),
    createMeal: (_root, { input }, { user }) => createMeal(input, user),
    deleteMeal: (_root, { id }, { user }) => deleteMealById(id, user),
  },

  User: {
    meals: (user) => getMealByUserId(user.id),
  },
};

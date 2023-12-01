import {
  dummyMeal,
  dummyMeals,
  dummyPlace,
  dummyPlaces,
  dummyUser,
  dummyUsers
} from "./utils/dummyData.js";


export const resolvers = {
  Query: {
    user: () => dummyUser,
    users: () => dummyUsers,
    meal: () => dummyMeal,
    meals: () => dummyMeals,
    place: () => dummyPlace,
    places: () => dummyPlaces,
  },
};
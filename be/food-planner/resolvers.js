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
    user: (_root, { id }) => {
      console.log(id);
      // db fetch function by user id here needed
      return dummyUser;
    },

    users: () => dummyUsers,

    meal: (_root, { id }) => dummyMeal,

    meals: () => dummyMeals,

    place: (_root, { id }) => dummyPlace,

    places: () => dummyPlaces,
  },

  User: {
    meals: (user) => {
      console.log(user.id);
      // db fetch meals by user id function needed here
      return dummyMeals;
    },
  },
};
const dummyUser = {
  userId: "123131",
  firstName: "John",
  lastName: "Doe",
  email: "john@email.com",
  password: "password",
  avatar: "http://www.somelink.com/images/",
  favorites: [],
  learned: [],
};

const dummyMeal = {
  mealId: "123441",
  name: "spaghetti",
  description: "spaghetti yummy",
  tags: ["pasta", "sugar"],
  author: "John",
  authorId: "123441",
};



export const resolvers = {
  Query: {
    user: () => dummyUser,
    meal: () => dummyMeal,
  },
};
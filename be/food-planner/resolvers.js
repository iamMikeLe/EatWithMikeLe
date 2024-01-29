import fs from "fs";
import { GraphQLUpload } from "graphql-upload-ts";
import path from "path";
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
// import { dummyPlace, dummyPlaces } from "./utils/dummyData.js";

export const resolvers = {
  Query: {
    user: (_root, { id }) => getUsersById(id),

    users: () => getUsers(),

    meal: (_root, { id }) => getMealById(id),

    meals: () => getAllMeals(),

    // place: (_root, { id }) => dummyPlace,

    // places: () => dummyPlaces,
  },

  Upload: GraphQLUpload,

  Mutation: {
    createUser: (_root, { input }) => createUser(input),
    createMeal: (_root, { input }, { user }) => createMeal(input, user),
    deleteMeal: (_root, { id }, { user }) => deleteMealById(id, user),
    async uploadImage(root, { image }, ctx) {
      try {
        const {
          createReadStream,
          filename /*, fieldName, mimetype, encoding */,
        } = await image;

        const filePath = path.join(
          __dirname,
          "/uploads",
          `${ctx.user.id}-${filename}`
        );
        const writeStream = fs.createWriteStream(filePath);

        await new Promise((resolve, reject) => {
          createReadStream()
            .pipe(writeStream)
            .on("finish", resolve)
            .on("error", reject);
        });

        return { success: true };
      } catch (error) {
        console.log("Image upload failed", error);
        return { success: false, message: error.message };
      }
    },
  },

  User: {
    meals: (user) => getMealByUserId(user.id),
  },
};

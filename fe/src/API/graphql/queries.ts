import { GraphQLClient, gql } from "graphql-request";
import { MealFormValue } from "types/meal-types";
import { getToken } from "utils/helper";

const apiUrl = import.meta.env.VITE_API_URL || "";

const client = new GraphQLClient(apiUrl, {
  headers: {
    authorization: `Bearer ${getToken()}`,
  },
});

export const fetchMeals = () => {
  return client.request(gql`
    query {
      meals {
        id
        title
        description
        imageUrl
      }
    }
  `);
};

export const createMeal = ({ title, description, tags }: MealFormValue) => {
  const mutation = gql`
    mutation CreateMeal($input: CreateMealInput!) {
      meal: createMeal(input: $input) {
        id
      }
    }
  `;
  return client.request(mutation, {
    input: {
      title,
      description,
      tags,
      imageUrl: "https://picsum.photos/320/190",
    },
  });
};

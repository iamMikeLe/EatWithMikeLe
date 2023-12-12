import { GraphQLClient, gql } from "graphql-request";

const apiUrl = import.meta.env.VITE_API_URL || "";
const client = new GraphQLClient(apiUrl);

export const fetchMeals = () => {
  return client.request(gql`
    query {
      meals {
        mealId
        title
        description
        imageUrl
      }
    }
  `);
};

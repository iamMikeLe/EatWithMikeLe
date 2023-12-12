import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("http://localhost:9000/graphql");

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

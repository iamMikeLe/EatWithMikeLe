import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

import { MealFormValue } from "types/meal-types";
import { getToken } from "utils/helper";

const apiUrl = import.meta.env.VITE_API_URL || "";

const uploadLink = createUploadLink({ uri: apiUrl });

const authLink = setContext((_, { headers }) => {
  const token = getToken(); // get the authentication token from local storage if it exists
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});

export const fetchMeals = () => {
  return client.query({
    query: gql`
      query {
        meals {
          id
          title
          description
          imageUrl
        }
      }
    `,
  });
};

export const createMeal = ({ title, description, tags }: MealFormValue) => {
  const mutation = gql`
    mutation CreateMeal($input: CreateMealInput!) {
      meal: createMeal(input: $input) {
        id
      }
    }
  `;
  return client.mutate({
    mutation,
    variables: {
      input: {
        title,
        description,
        tags,
        imageUrl: "https://picsum.photos/320/190",
      },
    },
  });
};

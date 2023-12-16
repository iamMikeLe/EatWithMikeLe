import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

import express from "express";
import { readFile } from "node:fs/promises";
import HttpError from "./models/http-error.js";
import { resolvers } from "./resolvers.js";

const app = express();
app.use(cors(), express.json(), bodyParser.json());

const typeDefs = await readFile("./schema.graphql", "utf8");

const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
app.use("/graphql", apolloMiddleware(apolloServer));

// error handling for unknown routes
app.use((_req, _res, _next) => {
  const error = new HttpError("could not find this route.", 404);
  throw error;
});

app.listen({ port: process.env.APP_PORT }, () => {
  console.log(`Server running on port ${process.env.APP_PORT}`);
  console.log(
    `GraphQL endpoint: http://localhost:${process.env.APP_PORT}/graphql`
  );
});

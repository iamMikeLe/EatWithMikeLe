import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import express from "express";
import { readFile } from "node:fs/promises";
import { createUser } from "./controllers/user-controller.js";
import HttpError from "./models/http-error.js";
import { resolvers } from "./resolvers.js";

const app = express();
app.use(cors(), express.json(), bodyParser.json());
const port = process.env.APP_PORT;
const typeDefs = await readFile("./schema.graphql", "utf8");

const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
app.use("/graphql", apolloMiddleware(apolloServer));

// error handling for unknown routes
app.use((_req, _res, _next) => {
  const error = new HttpError("could not find this route.", 404);
  throw error;
});

// error handling middleware
app.use((error, _req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

console.log("Connecting to database...", process.env.MONGO_DB);
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("connected successfully");
    app.listen({ port }, () => {
      console.log(`Server running on port ${port}`);
      console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
    });
  })
  // eslint-disable-next-line no-console
  .catch((err) => console.log("Could not connect to database.", err));

import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import { graphqlUploadExpress } from "graphql-upload-ts";
import mongoose from "mongoose";

import express from "express";
import { readFile } from "node:fs/promises";
import { authMiddleware, getContext } from "./controllers/auth.js";
import { handleLogin } from "./controllers/user-controller.js";
import HttpError from "./models/http-error.js";
import { resolvers } from "./resolvers.js";
import {
  DATABASE_CONNECTION_FAILED,
  INVALID_ROUTE,
  UNKNOWN_ERROR,
} from "./utils/constants.js";

const app = express();
app.use(cors(), express.json(), bodyParser.json(), authMiddleware);

// login route
app.post("/login", handleLogin);

const port = process.env.APP_PORT;
const typeDefs = await readFile("./schema.graphql", "utf8");

const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
app.use(
  "/graphql",
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  apolloMiddleware(apolloServer, { context: ({ req }) => getContext({ req }) })
);

// error handling for unknown routes
app.use(() => {
  const error = new HttpError(INVALID_ROUTE, 404);
  throw error;
});

// error handling middleware
app.use((error, _req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.status || 500);
  res.json({ message: error.message || UNKNOWN_ERROR });
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
  .catch((err) => console.log(DATABASE_CONNECTION_FAILED, err));

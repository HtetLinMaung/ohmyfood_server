import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import schema from "./graphql/schema";
import resolver from "./graphql/resolver";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolver,
    graphiql: true,
    formatError: (err) => {
      const originalError: any = err.originalError;
      if (!originalError) {
        return err;
      }
      const data = originalError.data;
      const message = err.message;
      const code = originalError.code || 500;
      return { message, status: code, data };
    },
  })
);

mongoose
  .connect(process.env.DATABASE || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => console.log(err));

import { buildSchema } from "graphql";
import { importSchema, mergeSchema } from "../utils/graphql-tools";

export default buildSchema(
  mergeSchema([
    importSchema("schemas/authSchema.gql"),
    importSchema("schemas/categorySchema.gql"),
    importSchema("schemas/categoryTypeSchema.gql"),
  ])
);

import authResolver from "./resolvers/authResolver";
import categoryResolver from "./resolvers/categoryResolver";
import categoryTypeResolver from "./resolvers/categoryTypeResolver";

export default {
  ...authResolver,
  ...categoryResolver,
  ...categoryTypeResolver
};

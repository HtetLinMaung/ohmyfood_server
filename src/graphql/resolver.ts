import authResolver from "./resolvers/authResolver";
import categoryResolver from "./resolvers/categoryResolver";

export default {
  ...authResolver,
  ...categoryResolver,
};

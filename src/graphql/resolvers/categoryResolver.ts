import { CategoryInput } from "../../dtos/categoryDto";
import validator from "validator";

export default {
  createCategory: async (
    { categoryInput }: { categoryInput: CategoryInput },
    req: any
  ) => {
    if (req.isAuth) {
      const error: any = new Error("Not Authenticated");
      error.code = 401;
      throw error;
    }
    const errors = [];
    if (validator.isEmpty(categoryInput.name)) {
      errors.push({ message: "Category name is invalid!" });
    }
    if (validator.isNumeric(categoryInput.price.toString())) {
      errors.push({ message: "Price is invalid!" });
    }
    if (errors.length > 0) {
      const error: any = new Error("Invalid input!");
      error.code = 422;
      error.data = errors;
      throw error;
    }
  },
};

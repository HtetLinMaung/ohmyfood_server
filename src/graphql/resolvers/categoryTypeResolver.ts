import { CategoryTypeInput } from "../../dtos/categoryTypeDto";
import User from "../../models/User";
import validator from "validator";
import CategoryType from "../../models/CategoryType";

export default {
  categoryTypes: async (
    {
      page,
      perPage,
    }: {
      page: number;
      perPage: number;
    },
    req: any
  ) => {
    if (!req.isAuth) {
      const error: any = new Error("Not Authenticated!");
      error.code = 401;
      throw error;
    }
    let categoryTypes;
    const totalRows = await (<any>CategoryType)
      .findWithoutDeleted()
      .countDocuments();
    if (!page || !perPage) {
      categoryTypes = await (<any>CategoryType)
        .findWithoutDeleted()
        .populate("categories");
    } else {
      categoryTypes = await (<any>CategoryType)
        .findWithoutDeleted()
        .populate("categories")
        .skip((page - 1) * perPage)
        .limit(perPage);
    }
    return {
      page,
      perPage,
      totalRows,
      categoryTypes: categoryTypes.map((categoryType: any) => ({
        ...categoryType._doc,
        createdAt: categoryType.createdAt.toISOString(),
        updatedAt: categoryType.updatedAt.toISOString(),
        deletedAt: categoryType.deletedAt?.toISOString(),
      })),
    };
  },
  createCategoryType: async (
    { categoryTypeInput }: { categoryTypeInput: CategoryTypeInput },
    req: any
  ) => {
    if (!req.isAuth) {
      const error: any = new Error("Not Authenticated!");
      error.code = 401;
      throw error;
    }
    const user = (await User.findById(req.userId))!;
    if (user.role == "customer") {
      const error: any = new Error("Unauthorized!");
      error.code = 401;
      throw error;
    }
    const errors = getValidationResults(categoryTypeInput);
    if (errors.length > 0) {
      const error: any = new Error("Invalid input!");
      error.code = 422;
      error.data = errors;
      throw error;
    }
    const categoryType = new CategoryType(categoryTypeInput);
    await categoryType.save();
    return {
      ...categoryType._doc,
      createdAt: categoryType.createdAt.toISOString(),
      updatedAt: categoryType.updatedAt.toISOString(),
      deletedAt: categoryType.deletedAt?.toISOString(),
    };
  },
};

const getValidationResults = (categoryTypeInput: CategoryTypeInput) => {
  const errors = [];
  if (validator.isEmpty(categoryTypeInput.name)) {
    errors.push("name is invalid!");
  }
  if (validator.isEmpty(categoryTypeInput.imageUrl)) {
    errors.push("imageUrl is invalid!");
  }
  if (!validator.isBoolean(categoryTypeInput.include.toString())) {
    errors.push("include is invalid!");
  }
  if (
    !Array.isArray(categoryTypeInput.categories) ||
    (categoryTypeInput.categories.length > 0 &&
      !categoryTypeInput.categories.every((v) => typeof v == "string"))
  ) {
    errors.push({ message: "Categories are invalid!" });
  }
  return errors;
};

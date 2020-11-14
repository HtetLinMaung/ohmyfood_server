import { CategoryTypeInput } from "../../dtos/categoryTypeDto";
import User from "../../models/User";
import validator from "validator";
import CategoryType from "../../models/CategoryType";
import Category from "../../models/Category";

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
      categoryTypes = await (<any>CategoryType).findWithoutDeleted(
        {},
        "categories"
      );
    } else {
      categoryTypes = await (<any>CategoryType)
        .findWithoutDeleted({}, "categories")
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
  categoryType: async ({ id }: { id: string }, req: any) => {
    if (!req.isAuth) {
      const error: any = new Error("Not Authenticated!");
      error.code = 401;
      throw error;
    }
    const categoryType = await (<any>CategoryType).findOneWithoutDeleted(
      { _id: id },
      "categories"
    );

    if (!categoryType) {
      const error: any = new Error("Category Type not found!");
      error.code = 404;
      throw error;
    }
    return {
      ...categoryType._doc,
      createdAt: categoryType.createdAt.toISOString(),
      updatedAt: categoryType.updatedAt.toISOString(),
      deletedAt: categoryType.deletedAt?.toISOString(),
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
    await Category.updateMany(
      { _id: { $in: categoryType.categories } },
      { $push: { types: categoryType._id } }
    );
    return {
      ...categoryType._doc,
      createdAt: categoryType.createdAt.toISOString(),
      updatedAt: categoryType.updatedAt.toISOString(),
      deletedAt: categoryType.deletedAt?.toISOString(),
    };
  },
  updateCategoryType: async (
    {
      id,
      categoryTypeInput,
    }: { id: string; categoryTypeInput: CategoryTypeInput },
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
    const categoryType = await CategoryType.findById(id);
    if (!categoryType) {
      const error: any = new Error("Category Type not found!");
      error.code = 404;
      throw error;
    }
    categoryType.name = categoryTypeInput.name;
    categoryType.imageUrl = categoryTypeInput.imageUrl;
    categoryType.include = categoryTypeInput.include;
    categoryType.categories = categoryTypeInput.categories;
    await categoryType.save();
    await Category.updateMany({}, { $pull: { types: id } });
    await Category.updateMany(
      { _id: { $in: categoryType.categories } },
      { $push: { types: id } }
    );
    return {
      ...categoryType._doc,
      createdAt: categoryType.createdAt.toISOString(),
      updatedAt: categoryType.updatedAt.toISOString(),
      deletedAt: categoryType.deletedAt?.toISOString(),
    };
  },
  deleteCategoryType: async (
    { id, permanent }: { id: string; permanent: boolean },
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
    const categoryType = CategoryType.findById(id);
    if (!categoryType) {
      return false;
    }
    if (permanent) {
      await CategoryType.findByIdAndDelete(id);
    } else {
      await (<any>CategoryType).softDeleteById(id);
    }
    return true;
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

import { CategoryInput } from "../../dtos/categoryDto";
import validator from "validator";
import User from "../../models/User";
import Category from "../../models/Category";
import CategoryType from "../../models/CategoryType";

export default {
  categories: async (
    { page, perPage }: { page: number; perPage: number },
    req: any
  ) => {
    if (!req.isAuth) {
      const error: any = new Error("Not Authenticated!");
      error.code = 401;
      throw error;
    }
    let categories;
    const totalRows = await (<any>Category)
      .findWithoutDeleted()
      .countDocuments();
    if (!page || !perPage) {
      categories = await (<any>Category).findWithoutDeleted({}, "types");
    } else {
      categories = await (<any>Category)
        .findWithoutDeleted({}, "types")
        .skip((page - 1) * perPage)
        .limit(perPage);
    }

    return {
      page,
      perPage,
      totalRows,
      categories: categories.map((category: any) => ({
        ...category._doc,
        createdAt: category.createdAt.toISOString(),
        updatedAt: category.updatedAt.toISOString(),
        deletedAt: category.deletedAt?.toISOString(),
        openHour: category.availableTime.openHour,
        closeHour: category.availableTime.closeHour,
      })),
    };
  },
  category: async ({ id }: { id: string }, req: any) => {
    if (!req.isAuth) {
      const error: any = new Error("Not Authenticated!");
      error.code = 401;
      throw error;
    }
    const category = await (<any>Category).findOneWithoutDeleted(
      { _id: id },
      "types"
    );

    if (!category) {
      const error: any = new Error("Category not found!");
      error.code = 404;
      throw error;
    }
    return {
      ...category._doc,
      createdAt: category.createdAt.toISOString(),
      updatedAt: category.updatedAt.toISOString(),
      deletedAt: category.deletedAt?.toISOString(),
      openHour: category.availableTime.openHour,
      closeHour: category.availableTime.closeHour,
    };
  },
  createCategory: async (
    { categoryInput }: { categoryInput: CategoryInput },
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
    const errors = getValidationResults(categoryInput);
    if (errors.length > 0) {
      const error: any = new Error("Invalid input!");
      error.code = 422;
      error.data = errors;
      throw error;
    }

    const category = new Category();
    category.name = categoryInput.name;
    category.price = categoryInput.price;
    category.discountPercent = categoryInput.discountPercent;
    category.availableTime = {
      openHour: categoryInput.openHour,
      closeHour: categoryInput.closeHour,
    };
    category.imageUrl = categoryInput.imageUrl;
    category.tags = categoryInput.tags;
    category.types = categoryInput.types;
    category.menus = categoryInput.menus;
    await category.save();
    await CategoryType.updateMany(
      { _id: { $in: category.types } },
      { $push: { categories: category._id } }
    );
    return {
      ...category._doc,
      createdAt: category.createdAt.toISOString(),
      updatedAt: category.updatedAt.toISOString(),
      deletedAt: category.deletedAt?.toISOString(),
    };
  },
  updateCategory: async (
    { id, categoryInput }: { id: string; categoryInput: CategoryInput },
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
    const errors = getValidationResults(categoryInput);

    if (errors.length > 0) {
      const error: any = new Error("Invalid input!");
      error.code = 422;
      error.data = errors;
      throw error;
    }
    const category = await Category.findById(id);
    if (!category) {
      const error: any = new Error("Category not found!");
      error.code = 404;
      throw error;
    }
    category.name = categoryInput.name;
    category.price = categoryInput.price;
    category.discountPercent = categoryInput.discountPercent;
    category.availableTime = {
      openHour: categoryInput.openHour,
      closeHour: categoryInput.closeHour,
    };
    category.imageUrl = categoryInput.imageUrl;
    category.tags = categoryInput.tags;
    category.types = categoryInput.types;
    category.menus = categoryInput.menus;
    category.updatedAt = new Date();
    await category.save();
    await CategoryType.updateMany({}, { $pull: { categories: id } });
    await CategoryType.updateMany(
      { _id: { $in: category.types } },
      { $push: { categories: id } }
    );

    return {
      ...category._doc,
      createdAt: category.createdAt.toISOString(),
      updatedAt: category.updatedAt.toISOString(),
      deletedAt: category.deletedAt?.toISOString(),
    };
  },
  deleteCategory: async (
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
    const category = Category.findById(id);
    if (!category) {
      return false;
    }
    if (permanent) {
      await Category.findByIdAndDelete(id);
    } else {
      await (<any>Category).softDeleteById(id);
    }
    return true;
  },
};

const getValidationResults = (categoryInput: CategoryInput) => {
  const errors = [];
  if (validator.isEmpty(categoryInput.name)) {
    errors.push({ message: "Category name is invalid!" });
  }
  if (!validator.isNumeric(categoryInput.price.toString())) {
    errors.push({ message: "Price is invalid!" });
  }
  if (!validator.isNumeric(categoryInput.discountPercent.toString())) {
    errors.push({ message: "Discount percent is invalid!" });
  }
  if (validator.isEmpty(categoryInput.openHour)) {
    errors.push({ message: "Open Hour is invalid!" });
  }
  if (validator.isEmpty(categoryInput.closeHour)) {
    errors.push({ message: "Close Hour is invalid!" });
  }
  if (validator.isEmpty(categoryInput.imageUrl)) {
    errors.push({ message: "Image is invalid!" });
  }
  if (
    !Array.isArray(categoryInput.tags) ||
    (categoryInput.tags.length > 0 &&
      !categoryInput.tags.every((v) => typeof v == "string"))
  ) {
    errors.push({ message: "Tags are invalid!" });
  }
  if (
    !Array.isArray(categoryInput.menus) ||
    (categoryInput.menus.length > 0 &&
      !categoryInput.menus.every((v) => typeof v == "string"))
  ) {
    errors.push({ message: "Menus are invalid!" });
  }
  if (
    !Array.isArray(categoryInput.types) ||
    (categoryInput.types.length > 0 &&
      !categoryInput.types.every((v) => typeof v == "string"))
  ) {
    errors.push({ message: "Types are invalid!" });
  }
  return errors;
};

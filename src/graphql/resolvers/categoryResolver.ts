import { CategoryInput } from "../../dtos/categoryDto";
import validator from "validator";
import User from "../../models/User";
import Category from "../../models/Category";

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
    const totalRows = await Category.find().countDocuments();
    if (!page || !perPage || (!page && !perPage)) {
      categories = await Category.find();
    } else {
      categories = await Category.find()
        .skip((page - 1) * perPage)
        .limit(perPage);
    }

    return {
      page,
      perPage,
      totalRows,
      categories: categories.map((category) => ({
        ...category._doc,
        createdAt: category.createdAt.toISOString(),
        updatedAt: category.updatedAt.toISOString(),
        deletedAt: category.deletedAt?.toISOString(),
      })),
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
    const errors = [];
    console.log(categoryInput);
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
    return {
      ...category._doc,
      createdAt: category.createdAt.toISOString(),
      updatedAt: category.updatedAt.toISOString(),
      deletedAt: category.deletedAt?.toISOString(),
    };
  },
};

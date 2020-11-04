import { UserInput } from "../../dtos/authDto";
import validator from "validator";

export default {
  signUp: async ({ userInput }: { userInput: UserInput }, _: any) => {
    const errors = [];
    if (validator.isEmpty(userInput.email)) {
      errors.push({ message: "Usernam is invalid!" });
    }
    if (!validator.isEmail(userInput.email)) {
      errors.push({ message: "Email is invalid!" });
    }
    if (!validator.isLength(userInput.password, { min: 6 })) {
      errors.push({ message: "Password too short!" });
    }
    if (!validator.isLength(userInput.phone, { max: 11, min: 9 })) {
      errors.push({ message: "Phone number is invalid!" });
    }
    if (errors.length > 0) {
      const error: any = new Error("Invalid input.");
      error.data = errors;
      error.code = 422;
      throw error;
    }
  },
};

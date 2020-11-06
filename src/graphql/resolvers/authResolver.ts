import { UserInput, UserDto } from "../../dtos/authDto";
import validator from "validator";
import Otp from "../../models/Otp";
import { Request } from "express";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default {
  signUp: async ({ userInput }: { userInput: UserInput }, _: Request) => {
    const errors = [];
    if (validator.isEmpty(userInput.username)) {
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
    const isPhoneValid = await verifyOtp(userInput);
    if (!isPhoneValid) {
      errors.push({ message: "Otp code is invalid!" });
    }
    if (errors.length > 0) {
      const error: any = new Error("Invalid input.");
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const oldUser = await User.findOne({ phone: userInput.phone });
    if (oldUser) {
      const error: any = new Error("User already exists!");
      error.code = 200;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(userInput.password, 12);
    const userDto: UserDto = {
      email: userInput.email,
      password: hashedPassword,
      phone: userInput.phone,
      username: userInput.username,
    };
    const user = new User(userDto);
    await user.save();
    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET || "secret",
      {
        expiresIn: "1d",
      }
    );

    return {
      token,
      user,
    };
  },
  login: async (
    { phone, password }: { phone: string; password: string },
    _: Request
  ) => {
    const errors = [];
    if (!validator.isLength(password, { min: 6 })) {
      errors.push({ message: "Password too short!" });
    }
    if (!validator.isLength(phone, { max: 11, min: 9 })) {
      errors.push({ message: "Phone number is invalid!" });
    }
    if (errors.length > 0) {
      const error: any = new Error("Invalid input.");
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const user = await User.findOne({ phone });
    if (!user) {
      const error: any = new Error("User not found!");
      error.code = 404;
      throw error;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const error: any = new Error("Password do not match!");
      error.code = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.SECRET || "secret",
      {
        expiresIn: "1d",
      }
    );
    return {
      token,
      user,
    };
  },
  getOtp: async ({ phone }: { phone: string }, _: Request) => {
    const errors = [];
    if (!validator.isLength(phone, { max: 11, min: 9 })) {
      errors.push({ message: "Phone number is invalid!" });
    }

    if (errors.length > 0) {
      const error: any = new Error("Invalid input.");
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const otp: any = await Otp.findOne({ phone });
    if (otp) {
      otp.otpCode = Math.floor(1000 + Math.random() * 9000).toString();
      await otp.save();
    } else {
      const newOtp = new Otp({ phone });
      await newOtp.save();
    }
    return { message: "OK" };
  },
};

const verifyOtp = async ({
  otpCode,
  phone,
}: {
  otpCode: string;
  phone: string;
}) => {
  const otp: any = await Otp.findOne({ phone });
  if (!otp || otp.otpCode !== otpCode) {
    return false;
  }
  await Otp.findByIdAndRemove(otp._id);
  return true;
};

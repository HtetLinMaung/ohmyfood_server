import { Response, NextFunction } from "express";
import User from "../models/User";

export default async (req: any, res: Response, next: NextFunction) => {
  try {
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
    next();
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
};

import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default (req: any, _: Response, next: NextFunction) => {
  req.isAuth = true;
  const header: string = req.get("Authorization");
  if (!header) {
    req.isAuth = false;
    return next();
  }
  const token = header.split(" ")[1];
  let decodedToken: any;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET || "secret");
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.userId = decodedToken.userId;
  req.isAuth = true;
  next();
};

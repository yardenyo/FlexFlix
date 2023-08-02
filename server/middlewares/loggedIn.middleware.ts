import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const loggedInMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.cookies.access_token;
  if (token) {
    jwt.verify(
      token,
      process.env.AUTH_SECRET || "my-secret",
      (err: any, decoded: any) => {
        if (err) {
          req.loggedIn = false;
          next();
        } else {
          req.loggedIn = true;
          req.user = decoded;
          next();
        }
      }
    );
  } else {
    req.loggedIn = false;
    next();
  }
};

export default loggedInMiddleware;

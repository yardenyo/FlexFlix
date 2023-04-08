import { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import helpers from "../helpers/app.helpers";

const AuthController = {
  login: (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err || helpers.isNil(user)) {
        return res.status(400).json({
          message: "Something went wrong",
          status: "failed",
        });
      }

      req.logIn(user, { session: false }, (err: any) => {
        if (err) {
          return res.status(400).json({
            message: "Something went wrong",
            status: "failed",
          });
        }
        const token = jwt.sign(
          { id: user._id },
          process.env.AUTH_SECRET || "my-secret",
          {
            expiresIn: process.env.ACCESS_TOKEN_ALIVE || "1h",
          }
        );
        res.cookie("jwt-token", token, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
        });
        return res.status(200).json({
          message: "Login successful",
          status: "success",
          token,
        });
      });
    })(req, res, next);
  },

  logout: (req: Request, res: Response) => {
    req.logout((err: any) => {
      if (err) {
        return res.status(400).json({
          message: "Something went wrong",
          status: "failed",
        });
      }
    });

    res.clearCookie("jwt-token");
    res.status(200).json({ message: "Logout successful", status: "success" });
  },
};

export default AuthController;

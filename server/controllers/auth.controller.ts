import { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import helpers from "../helpers/app.helpers";

const AuthController = {
  login: function (req: Request, res: Response, next: NextFunction): void {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err || helpers.isNil(user) || !user) {
        return res.status(400).json({
          message: "Something went wrong",
          status: false,
        });
      }

      req.logIn(user, { session: false }, (err: any) => {
        if (err) {
          return res.status(400).json({
            message: "Something went wrong",
            status: false,
          });
        }
        const token = jwt.sign(
          { id: user._id },
          process.env.AUTH_SECRET || "my-secret",
          {
            expiresIn: process.env.ACCESS_TOKEN_ALIVE || "1h",
          }
        );
        const maxAge = req.body.remember
          ? 1000 * 60 * 60 * 24 * 30
          : 1000 * 60 * 60 * 24;
        res.cookie("access_token", token, {
          maxAge,
          httpOnly: true,
        });

        return res.status(200).json({
          message: "Login successful",
          status: true,
          user: {
            email: user.email,
            username: user.username,
          },
        });
      });
    })(req, res, next);
  },

  logout: function (req: Request, res: Response): void {
    req.logout((err: any) => {
      if (err) {
        return res.status(400).json({
          message: "Something went wrong",
          status: false,
        });
      }
    });

    res.clearCookie("access_token");
    res.status(200).json({ message: "Logout successful", status: true });
  },
};

export default AuthController;

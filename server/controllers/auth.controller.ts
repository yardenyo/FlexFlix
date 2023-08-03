import { NextFunction, Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import helpers from "../helpers/app.helpers";
import HttpException from "../exceptions/HttpException";

const AuthController = {
  login: function (req: Request, res: Response, next: NextFunction): void {
    passport.authenticate("local", (err: any, user: any) => {
      if (err || helpers.isNil(user) || !user) {
        return next(new HttpException(400, "Something went wrong"));
      }

      req.logIn(user, { session: false }, (err: any) => {
        if (err) {
          return next(new HttpException(400, "Something went wrong"));
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
          sameSite: "none" as const,
          secure: true,
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
    })(req, res);
  },

  logout: function (req: Request, res: Response, next: NextFunction): void {
    req.logout((err: any) => {
      if (err) {
        return next(new HttpException(400, "Something went wrong"));
      }
      return;
    });

    res.clearCookie("access_token", {
      httpOnly: true,
      sameSite: "none" as const,
      secure: true,
    });
    res.status(200).json({ message: "Logout successful", status: true });
  },
};

export default AuthController;

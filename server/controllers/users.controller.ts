import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import User from "../models/users.model";
import Role from "../models/roles.model";
import bcrypt from "bcrypt";
import helpers from "../helpers/app.helpers";
import validate from "../middlewares/validation.middleware";
import HttpException from "../responses/HttpException";

const UserController = {
  create: async function (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    const registrationRules = [
      body("username")
        .notEmpty()
        .isString()
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long"),
      body("email").isEmail().withMessage("Email is not valid"),
      body("password").custom((value) => {
        if (!helpers.isValidRegisterPassword(value)) {
          throw new Error(
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
          );
        }
        return true;
      }),
      body("role").notEmpty().isString().withMessage("Role is required"),
    ];

    const passedValidation = await validate(registrationRules)(req);

    if (!passedValidation) {
      return next(new HttpException(500, "Something went wrong"));
    }

    try {
      const role = await Role.findOne({ name: req.body.role });
      if (helpers.isNil(role) || !role) {
        return next(new HttpException(500, "Something went wrong"));
      }
      let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: role._id,
      });
      const saltRounds = parseInt(process.env.SALT_ROUNDS || "10");
      const salt = await bcrypt.genSalt(saltRounds);
      user.password = await bcrypt.hash(user.password, salt);

      await user.save();
      req.body = {
        user: {
          username: user.username,
          email: user.email,
          role: user.role,
        },
      };
      req.message = "User created successfully";
      return next();
    } catch (err: any) {
      return next(new HttpException(500, "Something went wrong"));
    }
  },
  getAll: async function (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await User.find();
      req.body = users;
      req.message = "All users";
      return next();
    } catch (err: any) {
      return next(new HttpException(500, "Something went wrong"));
    }
  },
  getById: async function (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await User.findById(req.body.id);
      if (helpers.isNil(user) || !user) {
        return next(new HttpException(500, "Something went wrong"));
      }
      req.body = user;
      req.message = "User found";
      return next();
    } catch (err: any) {
      return next(new HttpException(500, "Something went wrong"));
    }
  },
  update: async function (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await User.findById(req.body.id);
      if (helpers.isNil(user) || !user) {
        return next(new HttpException(500, "Something went wrong"));
      } else {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;

        await user.save();
        req.body = {
          user: {
            username: user.username,
            email: user.email,
            role: user.role,
          },
        };
        req.message = "User updated successfully";
        return next();
      }
    } catch (err: any) {
      return next(new HttpException(500, "Something went wrong"));
    }
  },
  delete: async function (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await User.findByIdAndDelete(req.body.id);
      if (helpers.isNil(user) || !user) {
        return next(new HttpException(500, "Something went wrong"));
      }
      req.body = user;
      req.message = "User deleted successfully";
      return next();
    } catch (err: any) {
      return next(new HttpException(500, "Something went wrong"));
    }
  },
  deleteAll: async function (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await User.deleteMany();
      req.body = users;
      req.message = "All users deleted";
      return next();
    } catch (err: any) {
      return next(new HttpException(500, "Something went wrong"));
    }
  },
};

export default UserController;

import { Request, Response } from "express";
import { body } from "express-validator";
import User from "../models/users.model";
import bcrypt from "bcrypt";
import helpers from "../helpers/app.helpers";
import validate from "../middlewares/validation.middleware";

const UserController = {
  create: async function (req: Request, res: Response): Promise<void> {
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
    ];

    const passedValidation = await validate(registrationRules)(
      req,
      res,
      () => {}
    );

    if (!passedValidation) {
      res.status(500).json({ status: false, message: "Something went wrong" });
      return;
    }

    try {
      let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      const saltRounds = parseInt(process.env.SALT_ROUNDS || "10");
      const salt = await bcrypt.genSalt(saltRounds);
      user.password = await bcrypt.hash(user.password, salt);

      await user.save();
      res.status(200).json({
        status: true,
        data: {
          username: user.username,
          email: user.email,
        },
        message: "User created",
      });
    } catch (err: any) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },
  getAll: async function (req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find();
      res.status(200).json({ status: true, data: users, message: "All users" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
  getById: async function (req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findById(req.params.id);
      if (helpers.isNil(user) || !user) {
        res.status(200).json({ status: false, message: "User not found" });
      }
      res.status(200).json({ status: true, data: user, message: "User found" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
  update: async function (req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findById(req.params.id);
      if (helpers.isNil(user) || !user) {
        res.status(200).json({ status: false, message: "User not found" });
      } else {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;

        await user.save();
        res
          .status(200)
          .json({ status: true, data: user, message: "User updated" });
      }
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
  delete: async function (req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (helpers.isNil(user) || !user) {
        res.status(200).json({ status: false, message: "User not found" });
      }
      res
        .status(200)
        .json({ status: true, data: user, message: "User deleted" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
  deleteAll: async function (req: Request, res: Response): Promise<void> {
    try {
      const users = await User.deleteMany();
      res
        .status(200)
        .json({ status: true, data: users, message: "All users deleted" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default UserController;

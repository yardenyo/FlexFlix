import { Request, Response } from "express";
import User from "../models/users.model";
import bcrypt from "bcrypt";
import helpers from "../helpers/app.helpers";

const UserController = {
  create: async (req: Request, res: Response) => {
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
      res
        .status(200)
        .json({ status: true, data: user, message: "User created" });
    } catch (err: any) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },
  getAll: async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.status(200).json({ status: true, data: users, message: "All users" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id);
      if (helpers.isNil(user) || !user) {
        return res
          .status(200)
          .json({ status: false, message: "User not found" });
      }
      res.status(200).json({ status: true, data: user, message: "User found" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id);
      if (helpers.isNil(user) || !user) {
        return res
          .status(200)
          .json({ status: false, message: "User not found" });
      }
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;

      await user.save();
      res
        .status(200)
        .json({ status: true, data: user, message: "User updated" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (helpers.isNil(user) || !user) {
        return res
          .status(200)
          .json({ status: false, message: "User not found" });
      }
      res
        .status(200)
        .json({ status: true, data: user, message: "User deleted" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default UserController;

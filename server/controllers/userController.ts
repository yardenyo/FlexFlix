import express, { Express, Request, Response } from "express";
import User from "../models/userModel";

const UserController = {
  create: async (req: Request, res: Response) => {
    try {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      await user.save();
      res
        .status(200)
        .json({ status: "success", data: user, message: "User created" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
  getAll: async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res
        .status(200)
        .json({ status: "success", data: users, message: "All users" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res
          .status(200)
          .json({ status: "failed", message: "User not found" });
      }
      res
        .status(200)
        .json({ status: "success", data: user, message: "User found" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res
          .status(200)
          .json({ status: "failed", message: "User not found" });
      }

      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;

      await user.save();
      res
        .status(200)
        .json({ status: "success", data: user, message: "User updated" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res
          .status(200)
          .json({ status: "failed", message: "User not found" });
      }
      res
        .status(200)
        .json({ status: "success", data: user, message: "User deleted" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default UserController;

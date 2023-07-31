import { Request, Response, NextFunction } from "express";
import UserModel from "../models/users.model";
import Role from "../models/roles.model";
import { ERoles } from "../enums/roles.enums";
import { T_PassedUser } from "../types/users.types";

const authAdminMiddleware = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const passedUser: T_PassedUser = req.user as T_PassedUser;
    const user = await UserModel.findById(passedUser.id);
    if (!user) {
      res.status(500).json({ status: false, message: "Something went wrong" });
      return;
    }
    const role = await Role.findById(user.role);
    if (!role) {
      res.status(500).json({ status: false, message: "Something went wrong" });
      return;
    }
    if (role.name === ERoles.ADMIN) {
      next();
    } else {
      res.status(403).json({ status: false, message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
};

export default authAdminMiddleware;

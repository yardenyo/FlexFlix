import { Request, Response, NextFunction } from "express";
import UserModel from "../models/users.model";
import Role from "../models/roles.model";
import { ERoles } from "../enums/roles.enums";
import { T_PassedUser } from "../types/users.types";
import HttpException from "../exceptions/HttpException";

async function authAdminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const passedUser: T_PassedUser = req.user as T_PassedUser;
    const user = await UserModel.findById(passedUser.id);
    if (!user) {
      return next(new HttpException(500, "Something went wrong"));
    }
    const role = await Role.findById(user.role);
    if (!role) {
      return next(new HttpException(500, "Something went wrong"));
    }
    if (role.name === ERoles.ADMIN) {
      next();
    } else {
      res.status(403).json({ status: false, message: "Unauthorized" });
    }
  } catch (error) {
    return next(new HttpException(500, "Something went wrong"));
  }
}

export default authAdminMiddleware;

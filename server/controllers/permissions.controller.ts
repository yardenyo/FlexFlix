import { Request, Response, NextFunction } from "express";
import helpers from "../helpers/app.helpers";
import { body } from "express-validator";
import validate from "../middlewares/validation.middleware";
import Permission from "../models/permissions.model";
import Role from "../models/roles.model";
import HttpException from "../exceptions/HttpException";

const PermissionsController = {
  create: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const registrationRules = [
      body("name")
        .notEmpty()
        .isString()
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters long"),
      body("description")
        .notEmpty()
        .isString()
        .isLength({ min: 3 })
        .withMessage("Description must be at least 3 characters long"),
    ];

    const passedValidation = await validate(registrationRules)(req);

    if (!passedValidation) {
      return next(new HttpException(500, "Something went wrong"));
    }

    try {
      let permission = new Permission({
        name: req.body.name,
        description: req.body.description,
      });

      await permission.save();

      const adminRoles = await Role.find({ name: "admin" });
      if (helpers.isNil(adminRoles) || !adminRoles) {
        return next(new HttpException(500, "Something went wrong"));
      }
      adminRoles.forEach(async (role) => {
        role.permissions.push(permission._id);
        await role.save();
      });

      res.status(200).json({
        status: true,
        message: "Permission created successfully",
        data: {
          name: permission.name,
          description: permission.description,
        },
      });
    } catch (error) {
      return next(new HttpException(500, "Something went wrong"));
    }
  },
  getAll: async function (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const permissions = await Permission.find();
      res.status(200).json({
        status: true,
        data: permissions,
      });
    } catch (error) {
      return next(new HttpException(500, "Something went wrong"));
    }
  },
  getById: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const permission = await Permission.findById(req.body.id);
      res.status(200).json({
        status: true,
        data: permission,
      });
    } catch (error) {
      return next(new HttpException(500, "Something went wrong"));
    }
  },
  assign: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const role = await Role.findById(req.body.id);
      if (helpers.isNil(role) || !role) {
        return next(new HttpException(500, "Something went wrong"));
      }

      const permissions = await Permission.find({
        _id: { $in: req.body.permissions },
      });

      if (helpers.isNumpty(permissions) || !permissions) {
        return next(new HttpException(500, "Something went wrong"));
      }

      permissions.forEach(async (permission) => {
        if (!role.permissions.includes(permission._id)) {
          role.permissions.push(permission._id);
          await role.save();
        }
      });

      res.status(200).json({
        status: true,
        message: "Permission(s) assigned successfully",
        data: {
          role: role.name,
          permissions: permissions.map((permission) => permission.name),
        },
      });
    } catch (error) {
      return next(new HttpException(500, "Something went wrong"));
    }
  },
  remove: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const role = await Role.findById(req.body.id);
      if (helpers.isNil(role) || !role) {
        return next(new HttpException(500, "Something went wrong"));
      }

      const permissions = await Permission.find({
        _id: { $in: req.body.permissions },
      });

      if (helpers.isNumpty(permissions) || !permissions) {
        return next(new HttpException(500, "Something went wrong"));
      }

      permissions.forEach(async (permission) => {
        if (role.permissions.includes(permission._id)) {
          role.permissions.splice(role.permissions.indexOf(permission._id), 1);
          await role.save();
        }
      });

      res.status(200).json({
        status: true,
        message: "Permission(s) removed successfully",
        data: {
          role: role.name,
          permissions: permissions.map((permission) => permission.name),
        },
      });
    } catch (error) {
      return next(new HttpException(500, "Something went wrong"));
    }
  },
  update: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const registrationRules = [
      body("name")
        .notEmpty()
        .isString()
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters long"),
      body("description")
        .notEmpty()
        .isString()
        .isLength({ min: 3 })
        .withMessage("Description must be at least 3 characters long"),
    ];

    const passedValidation = await validate(registrationRules)(req);

    if (!passedValidation) {
      return next(new HttpException(500, "Something went wrong"));
    }

    try {
      const permission = await Permission.findByIdAndUpdate(
        req.body.id,
        {
          name: req.body.name,
          description: req.body.description,
        },
        { new: true }
      );
      res.status(200).json({
        status: true,
        message: "Permission updated successfully",
        data: permission,
      });
    } catch (error) {
      return next(new HttpException(500, "Something went wrong"));
    }
  },
  delete: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const permission = await Permission.findById(req.body.id);
      if (helpers.isNil(permission) || !permission) {
        return next(new HttpException(500, "Something went wrong"));
      }

      const roles = await Role.find({ permissions: permission._id });
      if (helpers.isNil(roles) || !roles) {
        return next(new HttpException(500, "Something went wrong"));
      }

      roles.forEach(async (role) => {
        role.permissions.splice(role.permissions.indexOf(permission._id), 1);
        await role.save();
      });

      await Permission.findByIdAndDelete(req.body.id);
      res.status(200).json({
        status: true,
        message: "Permission deleted successfully",
      });
    } catch (error) {
      return next(new HttpException(500, "Something went wrong"));
    }
  },
  deleteAll: async function (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const permissions = await Permission.find();
      if (helpers.isNil(permissions) || !permissions) {
        return next(new HttpException(500, "Something went wrong"));
      }

      permissions.forEach(async (permission) => {
        if (permission.name !== "admin") {
          const roles = await Role.find({ permissions: permission._id });
          if (helpers.isNil(roles) || !roles) {
            res
              .status(500)
              .json({ status: false, message: "Something went wrong" });
            return;
          }

          roles.forEach(async (role) => {
            role.permissions.splice(
              role.permissions.indexOf(permission._id),
              1
            );
            await role.save();
          });

          await Permission.findByIdAndDelete(permission._id);
        }
      });

      res.status(200).json({
        status: true,
        message: "All permissions deleted successfully",
      });
    } catch (error) {
      return next(new HttpException(500, "Something went wrong"));
    }
  },
};

export default PermissionsController;

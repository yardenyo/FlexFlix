import { Request, Response, NextFunction } from "express";
import Roles from "../models/roles.model";
import { body } from "express-validator";
import validate from "../middlewares/validation.middleware";
import helpers from "../helpers/app.helpers";
import HttpException from "../responses/HttpException";

const RolesController = {
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
      body("permissions")
        .optional()
        .isArray()
        .withMessage("Permissions must be an array"),
    ];

    const passedValidation = await validate(registrationRules)(req);

    if (!passedValidation) {
      return next(new HttpException(500, "Something went wrong"));
    }

    try {
      let role = new Roles({
        name: req.body.name,
        permissions: req.body.permissions || [],
      });

      await role.save();
      res.status(200).json({
        status: true,
        message: "Role created successfully",
        data: {
          name: role.name,
          permissions: role.permissions,
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
      const roles = await Roles.find();
      res.status(200).json({
        status: true,
        data: roles,
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
      const role = await Roles.findById(req.body.id);
      res.status(200).json({
        status: true,
        data: role,
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
    ];

    const passedValidation = await validate(registrationRules)(req);

    if (!passedValidation) {
      return next(new HttpException(500, "Something went wrong"));
    }

    try {
      const role = await Roles.findById(req.body.id);
      if (helpers.isNil(role) || !role) {
        return next(new HttpException(500, "Something went wrong"));
      }

      role.name = req.body.name;

      await role.save();
      res.status(200).json({
        status: true,
        message: "Role updated successfully",
        data: role,
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
      const role = await Roles.findByIdAndDelete(req.body.id);
      res.status(200).json({
        status: true,
        message: "Role deleted successfully",
        data: role,
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
      await Roles.deleteMany({});
      res.status(200).json({
        status: true,
        message: "All roles deleted successfully",
      });
    } catch (error) {
      return next(new HttpException(500, "Something went wrong"));
    }
  },
};

export default RolesController;

import { Request, Response, NextFunction } from "express";
import Roles from "../models/roles.model";
import { body } from "express-validator";
import validate from "../middlewares/validation.middleware";
import helpers from "../helpers/app.helpers";
import HttpException from "../responses/HttpException";

const RolesController = {
  create: async function (
    req: Request,
    _res: Response,
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
      req.body = {
        name: role.name,
        permissions: role.permissions,
      };
      req.message = "Role created successfully";
      return next();
    } catch (error) {
      return next(new HttpException(500, "Something went wrong"));
    }
  },
  getAll: async function (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const roles = await Roles.find();
      req.body = roles;
      return next();
    } catch (error) {
      return next(new HttpException(500, "Something went wrong"));
    }
  },
  getById: async function (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const role = await Roles.findById(req.body.id);
      req.body = role;
      return next();
    } catch (error) {
      return next(new HttpException(500, "Something went wrong"));
    }
  },
  update: async function (
    req: Request,
    _res: Response,
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
      req.body = role;
      req.message = "Role updated successfully";
      return next();
    } catch (error) {
      return next(new HttpException(500, "Something went wrong"));
    }
  },
  delete: async function (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const role = await Roles.findByIdAndDelete(req.body.id);
      req.body = role;
      req.message = "Role deleted successfully";
      return next();
    } catch (error) {
      return next(new HttpException(500, "Something went wrong"));
    }
  },
  deleteAll: async function (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await Roles.deleteMany({});
      req.message = "All roles deleted successfully";
      return next();
    } catch (error) {
      return next(new HttpException(500, "Something went wrong"));
    }
  },
};

export default RolesController;

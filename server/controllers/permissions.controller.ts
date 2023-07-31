import { Request, Response } from "express";
import helpers from "../helpers/app.helpers";
import { body } from "express-validator";
import validate from "../middlewares/validation.middleware";
import Permission from "../models/permissions.model";
import Role from "../models/roles.model";

const PermissionsController = {
  create: async function (req: Request, res: Response): Promise<void> {
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
      let permission = new Permission({
        name: req.body.name,
        description: req.body.description,
      });

      await permission.save();

      const adminRoles = await Role.find({ name: "admin" });
      if (helpers.isNil(adminRoles) || !adminRoles) {
        res
          .status(500)
          .json({ status: false, message: "Something went wrong" });
        return;
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
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },
  getAll: async function (req: Request, res: Response): Promise<void> {
    try {
      const permissions = await Permission.find();
      res.status(200).json({
        status: true,
        data: permissions,
      });
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },
  getById: async function (req: Request, res: Response): Promise<void> {
    try {
      const permission = await Permission.findById(req.params.id);
      res.status(200).json({
        status: true,
        data: permission,
      });
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },
  assign: async function (req: Request, res: Response): Promise<void> {
    try {
      const role = await Role.findById(req.params.id);
      if (helpers.isNil(role) || !role) {
        res
          .status(500)
          .json({ status: false, message: "Something went wrong" });
        return;
      }

      const permissions = await Permission.find({
        _id: { $in: req.body.permissions },
      });

      if (helpers.isNumpty(permissions) || !permissions) {
        res
          .status(500)
          .json({ status: false, message: "Something went wrong" });
        return;
      }
      permissions.forEach(async (permission) => {
        role.permissions.push(permission._id);
        await role.save();
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
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },
  update: async function (req: Request, res: Response): Promise<void> {
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
      const permission = await Permission.findByIdAndUpdate(
        req.params.id,
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
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },
  delete: async function (req: Request, res: Response): Promise<void> {
    try {
      await Permission.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: true,
        message: "Permission deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },
  deleteAll: async function (req: Request, res: Response): Promise<void> {
    try {
      await Permission.deleteMany({});
      res.status(200).json({
        status: true,
        message: "All permissions deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },
};

export default PermissionsController;

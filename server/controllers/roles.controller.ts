import { Request, Response } from "express";
import Roles from "../models/roles.model";
import { body } from "express-validator";
import validate from "../middlewares/validation.middleware";
import helpers from "../helpers/app.helpers";

const RolesController = {
  create: async function (req: Request, res: Response): Promise<void> {
    const registrationRules = [
      body("name")
        .notEmpty()
        .isString()
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters long"),
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
      let role = new Roles({
        name: req.body.name,
      });

      await role.save();
      res.status(200).json({
        status: true,
        message: "Role created successfully",
        data: {
          name: role.name,
        },
      });
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },
  getAll: async function (req: Request, res: Response): Promise<void> {
    try {
      const roles = await Roles.find();
      res.status(200).json({
        status: true,
        data: roles,
      });
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },
  getById: async function (req: Request, res: Response): Promise<void> {
    try {
      const role = await Roles.findById(req.body.id);
      res.status(200).json({
        status: true,
        data: role,
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
      const role = await Roles.findById(req.body.id);
      if (helpers.isNil(role) || !role) {
        res
          .status(500)
          .json({ status: false, message: "Something went wrong" });
        return;
      }

      role.name = req.body.name;

      await role.save();
      res.status(200).json({
        status: true,
        message: "Role updated successfully",
        data: role,
      });
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },
  delete: async function (req: Request, res: Response): Promise<void> {
    try {
      const role = await Roles.findByIdAndDelete(req.body.id);
      res.status(200).json({
        status: true,
        message: "Role deleted successfully",
        data: role,
      });
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },
  deleteAll: async function (req: Request, res: Response): Promise<void> {
    try {
      await Roles.deleteMany({});
      res.status(200).json({
        status: true,
        message: "All roles deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },
};

export default RolesController;

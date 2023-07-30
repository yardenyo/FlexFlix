import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";

const validate = (validationRules: ValidationChain[]) =>
  async function (req: Request, res: Response, next: NextFunction) {
    await Promise.all(validationRules.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(500)
        .json({ status: false, message: "Something went wrong" });
    }

    next();
  };

export default validate;

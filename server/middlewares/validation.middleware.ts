import { Request } from "express";
import { validationResult, ValidationChain } from "express-validator";

function validate(validationRules: ValidationChain[]) {
  return async function (req: Request): Promise<boolean> {
    await Promise.all(validationRules.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    return errors.isEmpty();
  };
}

export default validate;

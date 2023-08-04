import { NextFunction, Request, Response } from "express";
import helpers from "../helpers/app.helpers";

function successResponseMiddleware(
  req: Request,
  res: Response,
  _next: NextFunction
): Response {
  const status = 200;
  const message = req.message || "Success";
  const data = req.body;

  const jsonResponse = {
    message,
    status: true,
    ...(helpers.isNumpty(data) ? {} : { data }),
  };

  return res.status(status).json(jsonResponse);
}

export default successResponseMiddleware;

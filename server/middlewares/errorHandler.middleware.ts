//error handler middleware

import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";

function errorHandlerMiddleware(
  error: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  res.status(status).json({ message, status: false });
}

export default errorHandlerMiddleware;

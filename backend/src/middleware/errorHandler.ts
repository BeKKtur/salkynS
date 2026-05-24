import { NextFunction } from "./../../node_modules/@types/express-serve-static-core/index.d";
import { Request, Response } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.message && err.status) {
    res.status(err.status).json({
      message: err.message,
    });
  }
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
};

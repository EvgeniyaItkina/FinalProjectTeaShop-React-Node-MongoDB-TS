import { NextFunction, Request, Response } from "express";
import { RequestWithDecodedToken } from "./usersMiddleware";
import { errorLogStream } from "./log/morgan_logger";

export function adminRole(req: Request, res: Response, next: NextFunction) {
  try {
    if ((req as RequestWithDecodedToken).decoded.role !== "admin") {
      res.status(403).send();
    return;
    }

    next();
  } catch (error: any) {
    errorLogStream.write(`Error removing product from basketItems: ${error.message}\n`);

    res.status(403).send();
    return;
  }
}
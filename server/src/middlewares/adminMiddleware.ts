import { NextFunction, Request, Response } from "express";
import { RequestWithDecodedToken } from "./usersMiddleware";

export function adminRole(req: Request, res: Response, next: NextFunction) {
  try {
    if ((req as RequestWithDecodedToken).decoded.role !== "admin") {
      res.status(403).send();
    return;
    }

    next();
  } catch (error: any) {
    console.log(error.message);

    res.status(403).send();
    return;
  }
}
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export interface RequestWithDecodedToken extends Request {
  decoded: {
    userId: string;
    role: "user" | "admin";
  };
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      res.status(403).send();
      return;
    }
    const token = authHeader.split(" ")[1];

    const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";
    const decoded = jwt.verify(token, SECRET_KEY) as {
      userId: string;
      role: "user" | "admin";
    };
    (req as RequestWithDecodedToken).decoded = decoded;

    next();
  } catch (error: any) {
    console.log(error.message);

    res.status(403).send();
  }
}

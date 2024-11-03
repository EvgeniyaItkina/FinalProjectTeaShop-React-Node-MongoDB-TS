import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
export interface RequestWithDecodedToken extends Request {
  decoded: {
    userId: string;
    role: "user" | "admin";
  };
}

export async function authenticateToken(
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
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      res.status(401).send({ error: 1, description: "User not found" });
      return;
    }

    next();
  } catch (error: any) {
    res.status(403).send();
  }
}
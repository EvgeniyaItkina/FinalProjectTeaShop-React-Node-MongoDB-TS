import { Request, Response } from "express";
import Joi from "joi";
import User, { emailRegExp } from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const passwordRegExp = new RegExp("^[a-zA-Z0-9]{3,30}$");

const schemaJoi = Joi.object({
  password: Joi.string().min(6).required().pattern(passwordRegExp),
  email: Joi.string().required().pattern(emailRegExp),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
});
const loginSchemaJoi = Joi.object({
  email: Joi.string().required().pattern(emailRegExp),
});
export async function register(req: Request, res: Response) {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    const { error, value } = schemaJoi.validate({
      email,
      password,
      firstName,
      lastName,
      phone,
    });

    if (error) {
      throw Error(error.message);
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);
    value.password = hashedPassword;
    value.role = "user";

    const user = new User(value);

    await user.save();
    res.send({ error: 0, message: "User created" });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const { error } = loginSchemaJoi.validate({ email });
    if (error) {
      throw Error(error.message);
    }
    const user = await User.findOne({ email }, { password: 1, role: 1 });

    if (!user) {
      res.status(401).send({ error: "Invalid email or password" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).send({ error: "Invalid email or password" });
      return;
    }
    const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";
    const payload = {
      userId: user._id,
      role: user.role,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" });
    res.send({ token });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
}
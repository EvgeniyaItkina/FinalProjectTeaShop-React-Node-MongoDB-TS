import { Response } from "express";
import User from "../models/userModel";
import { RequestWithDecodedToken } from "../middlewares/usersMiddleware";
import Joi from "joi";

const schemaJoi = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
});

export async function getUserData(req: RequestWithDecodedToken, res: Response) {
  try {
    const decoded = req.decoded;

    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      res.status(404).send();
      return;
    }
    res.send({ data: user });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
}

export async function editUser(req: RequestWithDecodedToken, res: Response) {
  try {
    const decoded = req.decoded;
    const { firstName, lastName, phone } = req.body;
    const { error, value } = schemaJoi.validate({
      firstName,
      lastName,
      phone,
    });

    if (error) {
      throw Error(error.message);
    }

    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      res.status(404).send();
      return;
    }
    user.firstName = value.firstName;
    user.lastName = value.lastName;
    user.phone = value.phone;
    await user.save();
    res.send({ data: user });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
}

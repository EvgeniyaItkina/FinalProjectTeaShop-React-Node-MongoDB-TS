import e, { Response } from "express";
import User, { IUser } from "../models/userModel";
import { RequestWithDecodedToken } from "../middlewares/usersMiddleware";
import Joi from "joi";
import Product from "../models/productModel";

const schemaJoi = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
});

export async function getMeData(req: RequestWithDecodedToken, res: Response) {
  try {
    const decoded = req.decoded;

    const user = await User.findOne({ _id: decoded.userId }).populate(
      "basketItems.product"
    );
    if (!user) {
      res.status(404).send();
      return;
    }
    res.send({ data: user, error: 0 });
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
    await user.populate("basketItems.product");
    res.send({ data: user });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
}

export async function addFavorite(req: RequestWithDecodedToken, res: Response) {
  try {
    const decoded = req.decoded;
    const { userId } = decoded;
    const { favaoriteProducts } = req.body;

    const user = (await User.findOne({ _id: userId })) as IUser;

    user.favaoriteProducts = favaoriteProducts;

    await user.save();
    await user.populate("basketItems.product");
    res.send({ data: user });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
}
export async function setQuantityItemToBasket(
  req: RequestWithDecodedToken,
  res: Response
) {
  try {
    const decoded = req.decoded;
    const { userId } = decoded;
    const { productId, quantity } = req.body;
    const user = (await User.findOne({ _id: userId })) as IUser;

    const product = await Product.findOne({ _id: productId });
    if (!product) {
      res.status(404).send();
      return;
    }

    const basket_item = user.basketItems?.find((item) => {
      return item.product.toString() === productId;
    });
    if (quantity === 0) {
      // Remove item from basket
      user.basketItems = user.basketItems?.filter((item) => {
        return item.product.toString() !== productId;
      });
    } else {
      // Update quantity of item in basket
      if (basket_item) {
        basket_item.quantity = quantity;
        basket_item.price = product.price;
      } else {
        user.basketItems.push({
          product: productId,
          quantity,
          price: product.price,
        });
      }
    }
    await user.save();
    await user.populate("basketItems.product");
    res.send({ error: 0, data: user });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
}
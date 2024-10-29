import { Response, Request } from "express";
import User from "../models/userModel";
import Joi from "joi";
import Product from "../models/productModel";
import { createProductService } from "../services/productServices";

export async function deleteUser(req: Request, res: Response) {
  try {
    const { _id } = req.query;
    if (!_id) {
      throw Error("No id provided");
    }
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      res.status(404).send({ error: "User not found" });
      return;
    }
    res.send({ error: 0 });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await User.find();
    res.send({ error: 0, data: users });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
}

const schemaJoi = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required(),
  category: Joi.string().required(),
  subCategory: Joi.string(),
  ingredients: Joi.array().items(Joi.string()),
  price: Joi.number().required(),
  weight: Joi.number().required(),
  image: Joi.string(),
});

export async function createProduct(req: Request, res: Response) {
  try {
    const { name, category, subCategory, ingredients, price, weight, image } =
      req.body;
    const { error, value } = schemaJoi.validate({
      name,
      category,
      subCategory,
      ingredients,
      price,
      weight,
      image,
    });

    if (error) {
      throw Error(error.message);
    }

    const product = await createProductService(value);
    res.send({ error: 0, data: product });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
}

export async function editProduct(req: Request, res: Response) {
  try {
    const {
      _id,
      name,
      category,
      subCategory,
      ingredients,
      price,
      weight,
      image,
    } = req.body;
    const { error, value } = schemaJoi.validate({
      _id,
      name,
      category,
      subCategory,
      ingredients,
      price,
      weight,
      image,
    });

    if (error) {
      throw Error(error.message);
    }

    const product = await Product.findById(value._id);
    if (!product) {
      res.status(404).send({ error: "Product not found" });
      return;
    }
    product.overwrite(value);
    await product.save();

    res.send({ error: 0, data: product });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { _id } = req.query;

    if (!_id) {
      throw Error("Id is required");
    }

    const product = await Product.findByIdAndDelete(_id);
    if (!product) {
      res.status(404).send({ error: "Product not found" });
      return;
    }

    res.send({ error: 0 });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
}


export async function setUserRole(req: Request, res: Response) {
  try {
    const { _id, role } = req.body;

    if (!_id || !role) {
      throw Error("Id and role are required");
    }

    const user = await User.findById(_id);
    if (!user) {
      res.status(404).send({ error: "User not found" });
      return;
    }
    if (role === "admin") {
      user.role = "admin";
    } else {
      user.role = "user";
    }
    const updatedUser = await user.save();
    res.send({ error: 0, data: updatedUser });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
}
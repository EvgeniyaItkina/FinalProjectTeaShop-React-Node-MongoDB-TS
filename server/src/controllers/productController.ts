import Product from "../models/productModel";
import { Request, Response } from "express";

export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await Product.find();
    res.send({ error: 0, data: products });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
}
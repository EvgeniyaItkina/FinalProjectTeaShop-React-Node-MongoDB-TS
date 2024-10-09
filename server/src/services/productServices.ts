import Product from "../models/productModel";

export async function createProductService(value: {
  name: string;
  category: string;
  subCategory: string;
  ingredients: string[];
  price: number;
  weight: number;
  image: string;
}) {
  const product = new Product(value);

  await product.save();
  return product;
}
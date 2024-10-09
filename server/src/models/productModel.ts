import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: string;
  subCategory: string;
  ingredients: string[];
  price: number;
  weight: number;
  image: string;
  createdAt: Date;
}
const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    subCategory: {
      type: String,
      trim: true,
    },
    ingredients: {
      type: [String],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      trim: true,
    },
    weight: {
      type: Number,
      required: [true, "Weight is required"],
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
const Product = model<IProduct>("Product", productSchema);

export default Product;

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
  updatedAt: Date;
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
productSchema.index({ ingredients: 1 }); // Create index for ingredients field in Product collection for faster search


export default Product;

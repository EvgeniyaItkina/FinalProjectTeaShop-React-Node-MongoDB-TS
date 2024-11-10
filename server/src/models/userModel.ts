import { Schema, model, Document, Types } from "mongoose";
import Product from "./productModel";
import { errorLogStream } from "../middlewares/log/morgan_logger";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  role: "user" | "admin"; 
  favaoriteProducts: Types.ObjectId[];
  basketItems: {
    product: Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  createdAt: Date;
}
export const emailRegExp = new RegExp(
  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
);

const basketItem = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [emailRegExp, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    favaoriteProducts: {
      type: [Schema.Types.ObjectId],
      ref: Product,
    },
    basketItems: [basketItem],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Применение индекса на поле email для уникальности
userSchema.index({ email: 1 }, { unique: true });

// Модель пользователя
const User = model<IUser>("User", userSchema);

export async function findUsersWithProductInBasket(productId: string) {
  try {
    const users = await User.find({
      basketItems: { $elemMatch: { product: productId } },
    });

    return users;
  } catch (error) {
    errorLogStream.write(`Error removing product from basketItems: ${error}\n`);
  }
}

export async function removeProductFromBasket(
  userId: string,
  productId: string
) {
  try {
    await User.updateOne(
      { _id: userId },
      { $pull: { basketItems: { product: productId } } }
    );
  } catch (error) {
    errorLogStream.write(`Error removing product from basketItems:: ${error}\n`);
  }
}

export default User;
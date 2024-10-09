import { Schema, model, Document } from "mongoose";

// Интерфейс для типа данных пользователя
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  role: "user" | "admin"; // Допустимые значения для роли
  createdAt: Date;
}
export const emailRegExp = new RegExp(
  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
);

// Схема пользователя
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Добавляет поля createdAt и updatedAt автоматически
  }
);

// Применение индекса на поле email для уникальности
userSchema.index({ email: 1 }, { unique: true });

// Модель пользователя
const User = model<IUser>("User", userSchema);

export default User;

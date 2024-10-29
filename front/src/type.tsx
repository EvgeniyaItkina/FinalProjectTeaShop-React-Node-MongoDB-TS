export type BasketItem = {
  product: {
    _id: string;
    name: string;
  };
  quantity: number;
  price: number;
};

export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: "user" | "admin";
  favaoriteProducts: string[];
  basketItems: BasketItem[];
  createdAt: Date;
}

export interface IProduct {
  name: string;
  category: string;
  subCategory: string;
  ingredients: string[];
  price: number;
  weight: number;
  image: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}
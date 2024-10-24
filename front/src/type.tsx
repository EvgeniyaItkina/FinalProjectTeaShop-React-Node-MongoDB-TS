export type BasketItem = {
    product: {
      _id: string;
      name: string;
    };
    quantity: number;
    price: number;
  };

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    role: "user" | "admin";
    favaoriteProducts: string[];
    basketItems: BasketItem[];
    createdAt: Date;
}
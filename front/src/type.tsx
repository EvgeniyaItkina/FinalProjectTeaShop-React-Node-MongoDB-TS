export interface IUser extends Document {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    role: "user" | "admin";
    favaoriteProducts: string[];
    basketItems: {
        product: string;
        quantity: number;
        price: number;
    }[];
    createdAt: Date;
}
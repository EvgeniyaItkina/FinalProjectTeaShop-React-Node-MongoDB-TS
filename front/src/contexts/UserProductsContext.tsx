import React, { createContext, useContext, useState, ReactNode } from "react";
import { IUser } from "../type";

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

// Определяем типы для состояния контекста
interface UserProductsContextType {
  user: IUser | null;
  products: IProduct[];
  setUser: (user: IUser | null) => void;
  setProducts: (products: IProduct[]) => void;
  selectedCategory: string | undefined;
  setSelectedCategory: (category: string | undefined) => void;
  subSelectedCategory: string | undefined;
  setSubSelectedCategory: (category: string | undefined) => void;
  serchValue: string;
  setSearchValue: (value: string) => void;
}

// Инициализируем контекст с дефолтным значением
const UserProductsContext = createContext<UserProductsContextType | undefined>(
  undefined
);

// Провайдер контекста
export const UserProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [subSelectedCategory, setSubSelectedCategory] = useState<string | undefined>();
  const [serchValue, setSearchValue] = useState<string>("");
  return (
    <UserProductsContext.Provider
      value={{
        user,
        products,
        setUser,
        setProducts,
        selectedCategory,
        setSelectedCategory,
        subSelectedCategory,
        setSubSelectedCategory,
        serchValue,
        setSearchValue,
      }}    >
      {children}
    </UserProductsContext.Provider>
  );
};

// Хук для использования контекста
export const useUserProducts = () => {
  const context = useContext(UserProductsContext);
  if (!context) {
    throw new Error(
      "useUserProducts must be used within a UserProductsProvider"
    );
  }
  return context;
};
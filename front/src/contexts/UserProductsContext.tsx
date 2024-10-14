import React, { createContext, useContext, useState, ReactNode } from "react";

// Определяем интерфейсы для данных пользователя и товаров
interface User {
  id: number;
  name: string;
  email: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

// Определяем типы для состояния контекста
interface UserProductsContextType {
  user: User | null;
  products: Product[];
  setUser: (user: User | null) => void;
  setProducts: (products: Product[]) => void;
}

// Инициализируем контекст с дефолтным значением
const UserProductsContext = createContext<UserProductsContextType | undefined>(
  undefined
);

// Провайдер контекста
export const UserProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>({id: 1, name: "John Doe", email: "sdsds"});
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <UserProductsContext.Provider
      value={{ user, products, setUser, setProducts }}
    >
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
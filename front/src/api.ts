import axios from "axios";
import { getToken } from "./lib/TokenLib";
import { IUser } from "./type";
import { IProduct } from "./contexts/UserProductsContext";

export const getAllProducts = async () => {
  const response =await axios.get<{ data: IProduct[]; error: 0 }>(
    "/api/product/all-product"
  );
  return response;
};

export const getMe = async () => {
  const tokenStr = getToken();
  if (!tokenStr) {
    return false;
  }
  try {
    const response = await axios.get<{ data: IUser; error: 0 }>(
      "/api/user/me",
      {
        headers: { Authorization: `Bearer ${tokenStr}` },
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const saveFavorites = async (favaoriteProducts: string[]) => {
  const tokenStr = getToken();
  if (!tokenStr) return false;

  try {
    const response = await axios.post<{ data: IUser; error: 0 }>(
      "/api/user/set-user-favorite-products",
      { favaoriteProducts },
      {
        headers: { Authorization: `Bearer ${tokenStr}` },
      }
    );
    return response.data.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const saveItemToBasket = async (productId: string, quantity: number) => {
  const tokenStr = getToken();
  if (!tokenStr) return false;

  try {
    const response = await axios.post<{ data: IUser; error: 0 }>(
      "/api/user/set-item-quantity-to-basket",
      { productId, quantity },
      {
        headers: { Authorization: `Bearer ${tokenStr}` },
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

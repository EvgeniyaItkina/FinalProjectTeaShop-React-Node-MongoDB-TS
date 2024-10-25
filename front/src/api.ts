import axios, { AxiosError } from "axios";
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


export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post<{ token: string }>("/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (e) {
    const err = e as AxiosError;
    if (err.response?.data && (err.response.data as { error: string }).error) {
      throw new Error((err.response.data as { error: string }).error);
    }

    return false;
  }
};

export const registration = async (fields: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post<{ error: 0; message: string }>(
      "/api/auth/register",
      fields
    );
    return response.data;
  } catch (e) {
    const err = e as AxiosError;
    if (err.response?.data && (err.response.data as { error: string }).error) {
      throw new Error((err.response.data as { error: string }).error);
    }

    return false;
  }
};

export const editProfile = async (fields: {
  firstName: string;
  lastName: string;
  phone: string;
}) => {
  try {
    const tokenStr = getToken();
    if (!tokenStr) return false;
    const response = await axios.post<{ data: IUser; error: 0 }>(
      "/api/user/edit-data",
      fields,
      {
        headers: { Authorization: `Bearer ${tokenStr}` },
      }
    );
    return response.data;
  } catch (e) {
    const err = e as AxiosError;
    if (err.response?.data && (err.response.data as { error: string }).error) {
      throw new Error((err.response.data as { error: string }).error);
    }
    return false;
  }
};
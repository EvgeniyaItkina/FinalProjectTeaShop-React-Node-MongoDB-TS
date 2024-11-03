import axios, { AxiosError } from "axios";

import { getToken } from "./lib/TokenLib";
import { IProduct, IUser } from "./type";

export const getAllProducts = async () => {
  const response = await axios.get<{ data: IProduct[]; error: 0 }>(
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

export const editProduct = async (fields: IProduct) => {
  try {
    const tokenStr = getToken();
    if (!tokenStr) return false;
    const response = await axios.put<{ data: IProduct; error: 0 }>(
      "/api/admin/edit-product",
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

export const deleteProduct = async (id: string) => {
  try {
    const tokenStr = getToken();
    if (!tokenStr) return false;
    const response = await axios.delete<{ error: 0 }>(
      `/api/admin/delete-product?_id=${id}`,

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

export const createProduct = async (fields: IProduct) => {
  try {
    const tokenStr = getToken();
    if (!tokenStr) return false;
    const response = await axios.post<{ data: IProduct; error: 0 }>(
      "/api/admin/create-product",
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

export const getUsers = async () => {
  try {
    const tokenStr = getToken();
    if (!tokenStr) return false;
    const response = await axios.get<{ data: IUser[]; error: 0 }>(
      "/api/admin/get-users",
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

export const deleteUser = async (id: string) => {
  try {
    const tokenStr = getToken();
    if (!tokenStr) return false;
    const response = await axios.delete<{ error: 0 }>(
      `/api/admin/delete-user?_id=${id}`,

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

export const setUserRole = async (_id: string, role: string) => {
  try {
    const tokenStr = getToken();
    if (!tokenStr) return false;
    const response = await axios.patch<{ error: 0; data: IUser }>(
      "/api/admin/set-user-role",
      { _id, role },
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
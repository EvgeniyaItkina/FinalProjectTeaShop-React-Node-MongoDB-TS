import axios from "axios";

export const getAllProducts = async () => {
  const response = axios.get("/api/product/all-product");
  return response;
};
import axios, { AxiosResponse } from "axios";
import { Product } from "../../utils/types";

export const getProductsAPI = async () => {
  try {
    let response: AxiosResponse<Product[]> = await axios.get(
      "http://localhost:8080/products"
    );
    return response.data;
  } catch (e) {
    console.error("getProductsAPI error", e);
  }
};

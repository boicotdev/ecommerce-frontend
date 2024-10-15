import axios from "axios";
import { apiURL } from "../api/baseUrls";

export const authAxios = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true, // para manejar cookies en las solicitudes
});

// cargar los productos de la base de datos
export const getProducts = async () => {
  return authAxios.get("products/list/");
};

// retrieve a product details
export const retrieveProductDetails = (sku) => {
  return authAxios.get(`products/product/details/?sku=${sku}`);
};

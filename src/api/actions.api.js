import axios from "axios";
import { apiURL } from "../api/baseUrls";

export const authAxios = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true, // para manejar cookies en las solicitudes
});

// simple registration config
const axios_ = axios.create({
  baseURL: apiURL,
  timeout: 5000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// retrieve all user info
export const fetchUserInfo = (userId) => {
  return authAxios.get(`users/user/?user=${userId}`);
};

//user register
export const userCreate = (data) => {
  return axios_.post("users/create/", data);
};

// update user info
export const updateUserInfo = (data) => {
  return authAxios.put("users/user/update/", data);
};

// cargar los productos de la base de datos
export const getProducts = async () => {
  return authAxios.get("products/list/");
};

// retrieve a product details
export const retrieveProductDetails = (sku) => {
  return authAxios.get(`products/product/details/?sku=${sku}`);
};

//create a new product
export const createProduct = (data) => {
  return axios_.post("/products/create/", data);
};

//retrieve category list
export const retrieveCategoryList = () => {
  return authAxios.get("products/categories/");
};

//remove a single product
export const deleteProduct = (data) => {
  return authAxios.delete(`products/product/remove/`, { data });
};

//update a single product
export const updateProduct = (data) => {
  return axios_.put(`products/product/update/`, data);
};

//token obtain
export const tokenObtain = (data) => {
  return authAxios.post("users/token/obtain/", data);
};

//orders user list
export const retrieveUserOrderList = (userId) => {
  return authAxios.get(`carts/orders/list/?user=${userId}`);
};

export const orderCancell = (data) => {
  return authAxios.put(`orders/order/cancell/`, data);
};

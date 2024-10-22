import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { loadState, saveState } from "../utils/utils";

import { apiURL } from "../api/baseUrls";

export const authAxios = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // para manejar cookies en las solicitudes
});

// Interceptor para agregar el token de autenticación a las solicitudes
authAxios.interceptors.request.use(
  async (config) => {
    const { access, refresh } = loadState("user");
    if (access !== undefined && access !== null) {
      config.headers.Authorization = `Bearer ${access}`;
      const info = jwtDecode(access);
      const today = new Date();
      const tokenExpiry = new Date(info.exp * 1000); // La propiedad exp está en segundos, por lo que multiplicas por 1000 para obtener milisegundos
      const limit = 5 * 60; // 5 minutos en segundos

      if (tokenExpiry - today <= limit * 1000) {
        // Renovar el token
        try {
          const response = await axios.post(`${apiURL}/token/refresh/`, {
            refresh,
          });

          const newToken = response.data.access;
          config.headers.Authorization = `Bearer ${newToken}`;

          // Actualizar el token en el almacenamiento local
          saveState("user", { token: newToken, user: info.username });
        } catch (error) {
          // Manejar el error de renovación (puedes redirigir a la página de inicio de sesión, por ejemplo)
          console.error("Error during token refresh:", error);
          // Puedes manejar el error según tus necesidades, por ejemplo, redirigir a la página de inicio de sesión
          window.location.href = "/login";
        }
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

//order cancel user
export const orderCancell = (data) => {
  return authAxios.put(`orders/order/cancel/`, data);
};

//retrieve all orders for user
export const getOrders = () => {
  return authAxios.get(`dashboard/orders/`);
};

//retrieve order details by user
export const getOrderDetails = (orderId) => {
  return authAxios.get(`dashboard/order/details/?order=${orderId}`);
};

//retrieve all clients from database
export const getUserClients = () => {
  return authAxios.get("dashboard/clients/");
};

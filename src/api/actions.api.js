import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { loadState, saveState } from "../utils/utils";

import { apiURL } from "../api/baseUrls";
import toast from "react-hot-toast";

export const authAxios = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interceptor para agregar el token de autenticación a las solicitudes
authAxios.interceptors.request.use(
  async (config) => {
    const user = loadState("user");
    const { access, refresh } = user;
    if (access !== undefined && access !== null) {
      config.headers.Authorization = `Bearer ${access}`;
      const info = jwtDecode(access);
      const today = new Date();
      const tokenExpiry = new Date(info.exp * 1000);
      const limit = 5 * 60; // 5 minutos en segundos

      if (tokenExpiry - today <= limit * 1000) {
        // Renovar el token
        try {
          // Realiza la petición para obtener un nuevo token
          toast.success("El token se va a renovar");
          const response = await axios.post(`${apiURL}/users/token/refresh/`, {
            refresh,
          });

          const newToken = response.data.access;
          // Actualizar el token en el encabezado de la solicitud
          const refreshToken = response.data.refresh;
          config.headers.Authorization = `Bearer ${newToken}`;

          // Actualizar el token en el almacenamiento local
          saveState("user", {
            ...user,
            access: newToken,
            refresh: refreshToken,
          });
        } catch (error) {
          // Manejar el error de renovación (puedes redirigir a la página de inicio de sesión, por ejemplo)
          console.error("Error during token refresh:", error);
          toast.error("Error during token refresh");
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

//handle cart creation
export const cartCreate = (data) => {
  return authAxios.post("carts/create/", data);
};

//get cart details
export const cartDetails = (cartId) => {
  return authAxios.get(`orders/carts/check/?cart=${cartId}`);
};

//load payment details
export const paymentDetails = (orderId) => {
  return authAxios.get(`orders/carts/payments/?order=${orderId}`);
};

//handle cart items creation
export const cartItemsCreate = (data) => {
  return authAxios.post("carts/items/create/", data);
};

// add product to cart
export const addToCart = (data) => {
  return authAxios.post("carts/products/create/", data);
};

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

//add a new category
export const createCategory = (data) => {
  return authAxios.post(`products/categories/create/`, data);
};

//retrieve category list
export const retrieveCategoryList = () => {
  return authAxios.get("products/categories/");
};

//update a single category
export const updateCategory = (data) => {
  return authAxios.put(`products/categories/update/`, data);
};

//delete a single category
export const deleteCategory = (data) => {
  return authAxios.post(`products/categories/remove/`, { id: data });
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

//logout
export const logout = () => {
  return authAxios.post("users/logout/");
};

//orders user create
export const createOrder = (data) => {
  return authAxios.post("carts/orders/create/", data);
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

//testimonial creation
export const createTestimonial = (data) => {
  return authAxios.post("testimonials/create/", data);
};

//retrieve all user comments from database
export const getUserComments = () => {
  return authAxios.get("testimonials/");
};

//retrieve all testimonials of a user
export const getUserTestimonials = (userId) => {
  return authAxios.get(`testimonials/user/?user=${userId}`);
};

//delete a user testimonials
export const deleteUserTestimonial = (data) => {
  return authAxios.delete(`testimonials/testimonial/remove/`, { data });
};

// create payment preference
export const createPaymentPreference = (items) => {
  return authAxios.post("payment/preferences/", items);
};



// create a new coupon code
export const createCoupon = (data) => {
  return authAxios.post("coupons/create/", data);
};

// retrieve all coupon codes
export const getCoupons = () => {
  return authAxios.get("coupons/");
};

// remove a single coupon
export const removeCoupon = (couponCode) => {
  return authAxios.post("coupons/delete/", { coupon_code: couponCode });
};

// update a single coupon
export const updateCoupon = (data) => {
  return authAxios.put("coupons/update/", data);
};

// validate a single coupon
export const validateCoupon = (couponCode) => {
  return authAxios.post("coupons/validate/", { coupon_code: couponCode });
};
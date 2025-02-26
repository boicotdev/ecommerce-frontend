import { authAxios } from "./actions.api";
import { getProductCartDetails } from "./product-cart.api";

//process payment
export const createPayment = (data) => {
  return authAxios.post("payment/process/", data);
};

// create payment preference
export const createPaymentPreference = (items) => {
  return authAxios.post("payment/preferences/", items);
};


/**
 * Check if order items has changed
 * Compare the order items locally and the order items in the backend 
 */

export const checkOrderItemsChanged = async (orderItems, userID, cartID) => {
  const { data: cartItems } = await getProductCartDetails(userID, cartID);

  // Convertimos ambos arrays en objetos clave-valor para facilitar la comparación
  const orderMap = new Map(orderItems.map(item => [item.product, item.quantity]));
  const cartMap = new Map(cartItems.map(item => [item.product, item.quantity]));

  // Verificar si hay diferencias en cantidades o productos nuevos/eliminados
  if (orderMap.size !== cartMap.size) return true; // Se agregó o eliminó un producto

  for (const [productID, quantity] of orderMap) {
    if (!cartMap.has(productID) || cartMap.get(productID) !== quantity) {
      return true; // Se encontró una diferencia en cantidad o un producto nuevo
    }
  }

  return false; // No hubo cambios en los productos ni en las cantidades
};

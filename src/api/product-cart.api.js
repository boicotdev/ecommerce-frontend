import { authAxios } from "./actions.api";

// retrieve all products into the shopping cart
export const getProductCartDetails = (userID, cartID) => {
    return authAxios.get(`/carts/products/list/?cart=${cartID}&user=${userID}`)
}
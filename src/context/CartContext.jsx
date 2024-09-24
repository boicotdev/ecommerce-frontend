import {useState, useContext, createContext} from "react";

const CartContext = createContext();
export const CartContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  return (
  <CartContext.Provider
    value={{items, setItems}}
  >
    {children}
  </CartContext.Provider>
  )}

export const useCart = () => {
  return useContext(CartContext);
}
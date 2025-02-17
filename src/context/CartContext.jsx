import { useState, useContext, createContext } from "react";

const CartContext = createContext();
export const CartContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cartIsSaved, setCartIsSaved] = useState(false);

  return (
    <CartContext.Provider
      value={{
        items,
        setItems,
        orders,
        setOrders,
        cartIsSaved,
        setCartIsSaved,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

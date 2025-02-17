import { useState, createContext, useContext } from "react";

const customLocalStorage = createContext();

export const CustomLocalStorageProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const saveCart = (cart) => {
    localStorage.setItem("orders", JSON.stringify(cart));
  };

  const loadCart = () => {
    const cartFromLS = localStorage.getItem("orders");
    if (cartFromLS) {
      setCart(JSON.parse(cartFromLS));
    }
  };
  //save state into the localStorage
  const saveState = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const loadState = (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  };

  // Fetch cart data from local storage on component mount

  return (
    <customLocalStorage.Provider
      value={{ cart, setCart, saveCart, saveState, loadState }}
    >
      {children}
    </customLocalStorage.Provider>
  );
};

export const useCustomLocalStorage = () => {
  return useContext(customLocalStorage);
};

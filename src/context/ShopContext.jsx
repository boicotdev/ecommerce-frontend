import { createContext, useState, useContext } from "react";

const ShopContext = createContext();

export const ShopContextProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    return (
      <ShopContext.Provider value={{ products, setProducts, cart, setCart }}>
        {children}
      </ShopContext.Provider>
    );
}

export const useShop = () => {
    return useContext(ShopContext);
}
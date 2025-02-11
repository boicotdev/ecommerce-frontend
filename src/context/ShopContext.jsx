import { createContext, useState, useContext } from "react";

const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coupons, setCoupons] = useState([]);

  return (
    <ShopContext.Provider
      value={{
        products,
        setProducts,
        cart,
        setCart,
        testimonials,
        setTestimonials,
        coupons,
        setCoupons,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  return useContext(ShopContext);
};

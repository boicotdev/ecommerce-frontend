import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { tokenObtain, logout, cartCreate, addToCart } from "../api/actions.api";
import { resetForm, saveState } from "../utils/utils";

// utils/localStorage.js
export const getFromLocalStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

export const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

// api/cartService.js

export const createCart = async (user) => {
  return cartCreate({
    name: `cart_dummy_${Math.ceil(Math.random() * 1000000)}`,
    description: `Cart created at ${new Date()}`,
    user: user.id,
  });
};

export const addProductsToCart = async (cartID, orders) => {
  return addToCart({
    cart: cartID,
    products: orders.map((item) => ({
      sku: item.sku,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    })),
  });
};

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [cartIsSaved, setCartIsSaved] = useState(false);
  const [cartID, setCartID] = useState("");

  const navigate = useNavigate();

  const handleCartCreation = async () => {
    //TODO: check if the current user isn't a superuser
    
  };

  // useEffect(() => {
  //   const storedCartID = localStorage.getItem("cartID");
  //   if (storedCartID) {
  //     setCartID(storedCartID);
  //     setCartIsSaved(true);
  //   } else {
  //     setCartID("");
  //     setCartIsSaved(false);
  //   }
  // }, []);

  const handleLogin = async (userData) => {
    try {
      const response = await tokenObtain(userData);
      if (response.status === 200) {
        const { username, id, is_superuser, access, refresh, avatar, address } =
          response.data;

        setIsLoggedIn(true);
        setToken(access);
        setUser({
          username,
          id,
          is_superuser,
          access,
          refresh,
          avatar,
          address,
        });

        saveState("user", {
          username,
          id,
          is_superuser,
          access,
          refresh,
          avatar,
        });
        setToLocalStorage("user", {
          username,
          id,
          is_superuser,
          access,
          refresh,
          avatar,
        });

        if (is_superuser) {
          setIsAdmin(true);
          navigate("dashboard");
        } else {
          setIsAdmin(false);
          navigate("account");
        }

        resetForm("login_form");
        // handleCartCreation();
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      toast.error("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        clearLocalStorage();
        setToken("");
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUser({});
        setCartIsSaved(false);
        setCartID("");
        toast.success("Sesión cerrada correctamente");
        navigate("/");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        handleLogin,
        handleLogout,
        user,
        setUser,
        username,
        setUsername,
        isAdmin,
        setIsAdmin,
        token,
        setToken,
        setCartID,
        cartIsSaved,
        setCartIsSaved,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

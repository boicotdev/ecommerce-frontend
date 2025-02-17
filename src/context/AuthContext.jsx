import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  tokenObtain,
  logout,
  cartCreate,
  addToCart,
  cartItemsCreate,
} from "../api/actions.api";
import { resetForm } from "../utils/utils";
import { useCustomLocalStorage } from "../hooks/CustomHooks";
import { useCart } from "./CartContext";
import { data } from "autoprefixer";

export const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
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
  const [cartID, setCartID] = useState("");
  const { saveState, loadState } = useCustomLocalStorage();
  const { cartIsSaved, setCartIsSaved } = useCart();

  const navigate = useNavigate();

  //handle cart items creation
  const createCartItems = async () => {
    try {
      const orders = loadState("orders").map((cartItem) => {
        return {
          quantity: cartItem.quantity,
          product: cartItem.id,
        };
      });
      const response = await cartItemsCreate({
        data: {
          items: orders,
          cart_id: cartID ? cartID : loadState("CartID"),
        },
      });
      if (response.status === 201) {
        toast.success("Productos añadidos al carrito exitosamente");
      }
    } catch (error) {
      const { response } = error;
      console.error(response);
    }
  };

  const handleCartCreation = async () => {
    //check if the current user is a superuser
    if (user.is_superuser) return;

    try {
      const response = await cartCreate({
        user: loadState("user")["id"],
        name: loadState("CartID"),
        description: `Cart created at ${new Date().toDateString()}`,
      });
      if (response.status === 201) {
        setCartID(response.data.name);
        setCartIsSaved(true);
        saveState("cartIsSaved", true);
        toast.success("Carrito creado exitosamente");
        createCartItems();
      }
    } catch (error) {
      const { response } = error;
      console.error(response);
    }
  };

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
        if (
          loadState("CartID") !== null &&
          loadState("cartIsSaved") === false
        ) {
          const orders = loadState("orders");
          if (orders.length > 0) {
            handleCartCreation();
            setCartIsSaved(true);
            saveState("cartIsSaved", true);
          }
        }
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
        setToken("");
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUser({});
        setCartID("");
        toast.success("Sesión cerrada correctamente");
        navigate("/");
        localStorage.removeItem("user");
        localStorage.removeItem("address");
        localStorage.removeItem("user");
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
        cartID,
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

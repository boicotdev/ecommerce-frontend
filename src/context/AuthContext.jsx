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
import { cartCreate, addToCart } from "../api/actions.api";

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

// context/AuthContext.js
import { useState, createContext, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { tokenObtain, logout } from "../api/actions.api";
import { resetForm, saveState } from "../utils/utils";

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
    if (cartIsSaved) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await createCart(user);
      if (response.status === 201) {
        setCartID(response.data.id);
        setCartIsSaved(true);
        toast.success("Carrito creado exitosamente.");
        localStorage.setItem("cartID", response.data.id);

        // create a new product cart
        try {
          const orders = JSON.parse(localStorage.getItem("orders"));
          const res = await addProductsToCart(response.data.id, orders);
          if (res.status === 200) {
            toast.success("Productos añadidos al carrito exitosamente.");
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.error("Error al crear el carrito:", error);
      toast.error("Ocurrió un error. Intenta nuevamente.");
    }
  };

  useEffect(() => {
    const storedCartID = localStorage.getItem("cartID");
    if (storedCartID) {
      setCartID(storedCartID);
      setCartIsSaved(true);
    } else {
      setCartID("");
      setCartIsSaved(false);
      handleCartCreation()
    }
  }, []);

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
          navigate("/dashboard");
        } else {
          setIsAdmin(false);
          navigate("/account");
        }

        resetForm("login_form");
        handleCartCreation();
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

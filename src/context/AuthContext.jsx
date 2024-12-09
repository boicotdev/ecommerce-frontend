import { useState, createContext, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logout, tokenObtain } from "../api/actions.api";
import { resetForm, saveState } from "../utils/utils";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  
  const navigate = useNavigate();

  const handleLogin = async (userData) => {
    try {
      const response = await tokenObtain(userData);
      if (response.status === 200) {
        setIsLoggedIn(true);
        setToken(response.data.access);
        const { username, id, is_superuser, access, refresh, avatar } =
          response.data;
        setUser({
          username,
          id,
          is_superuser,
          access,
          refresh,
          avatar,
        });
        saveState("user", {
          username,
          is_superuser,
          id,
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        saveState("user", {});
        navigate("/");
        setToken("");
        setIsLoggedIn(false);
        setIsAdmin(false);
        toast.success("Sesión cerrada correctamente");
        setUser({})
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al cerrar sesión");
      return;
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

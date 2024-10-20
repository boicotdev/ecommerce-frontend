import { useState, createContext, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { tokenObtain } from "../api/actions.api";
import { resetForm, saveState } from "../utils/utils";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const handleLogin = async (userData) => {
    try {
      const response = await tokenObtain(userData);
      if (response.status === 200) {
        setIsLoggedIn(true);
        setToken(response.data.access);
        const { username, id, is_superuser, access, refresh, avatar } = response.data;
        setUser({
          username,
          id,
          is_superuser,
          access,
          refresh,
          avatar,
        });
        saveState("user", { username, is_superuser, id, access, refresh, avatar });
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
      alert(error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setToken("");
    navigate("/");
    toast.success("Sesión cerrada correctamente");
    saveState("user", null);
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

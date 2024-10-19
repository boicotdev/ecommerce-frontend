import { useState, createContext, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { tokenObtain } from "../api/actions.api";
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
        setToken(response.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setToken("");
    // setUser(null);
    navigate("/");
    toast.success("Sesión cerrada correctamente");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        handleLogin,
        handleLogout,
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

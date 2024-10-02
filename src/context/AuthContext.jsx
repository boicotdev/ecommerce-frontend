import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "John Doe",
    email: "john.doe@example.com",
    password: "12345",
    isAdmin: true,
  });

  const handleLogin = (userData) => {
    console.log(userData)
    // Simulando login con token
    if (
      userData.password === user.password &&
      userData.username === user.username &&
      userData.isAdmin
    ) {
      setToken("1234567890");
      setIsLoggedIn(true);
      setIsAdmin(true);
      navigate("/dashboard");
    } else if (
      userData.username === user.username &&
      userData.password === user.password &&
      !userData.isAdmin
    ) {
      setToken("1234567890");
      setIsLoggedIn(true);
      setIsAdmin(false);
      navigate("/account")
    }
    else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setToken("");
    // setUser(null);
    navigate("/")
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

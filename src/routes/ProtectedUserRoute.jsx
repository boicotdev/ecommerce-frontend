import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import { checkStateWhenUserOpenedANewWindow } from "../utils/utils";

function PrivateUserRoute({ element }) {
  const { isLoggedIn, setIsLoggedIn,  setIsAdmin } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula la verificación de autenticación
    const checkAuth = async () => {
      // Realiza cualquier verificación asíncrona de autenticación aquí
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula una llamada de red
      setLoading(false); // Se termina la verificación, desactiva el loading
    };
    checkAuth();
  }, []);

  if (loading) {
    return <Spinner />
  }

  const {userSession, is_superuser} = checkStateWhenUserOpenedANewWindow();
  if(isLoggedIn && userSession && is_superuser) {
    setIsAdmin(true);
    
  } else  if (userSession && !is_superuser) {
    setIsAdmin(false);
    setIsLoggedIn(true);
  } else {
    setIsAdmin(false);
    setIsLoggedIn(false);
    return <Navigate to="/authenticate" />;
  }
  return userSession ? element : <Navigate to="/authenticate" />;
}

export default PrivateUserRoute;

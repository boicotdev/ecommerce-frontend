import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

function PrivateUserRoute({ element }) {
  const { isLoggedIn } = useAuth();
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

  // Renderiza el componente si el usuario está autenticado
  return isLoggedIn ? element : <Navigate to="/authenticate" />;
}

export default PrivateUserRoute;

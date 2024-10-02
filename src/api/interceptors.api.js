import axios from "axios";
import { apiURL } from "./baseUrls";
import { jwtDecode } from "jwt-decode";
import { loadState, saveState } from "../utils/utils";
import { authAxios } from "./auth";

// Interceptor para agregar el token de autenticación a las solicitudes
authAxios.interceptors.request.use(
  async (config) => {
    const { access, refresh } = loadState("user");
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
      const info = jwtDecode(access);
      const today = new Date();
      const tokenExpiry = new Date(info.exp * 1000); // La propiedad exp está en segundos, por lo que multiplicas por 1000 para obtener milisegundos
      const limit = 5 * 60; // 5 minutos en segundos

      if (tokenExpiry - today <= limit * 1000) {
        // Renovar el token
        try {
          const response = await axios.post(`${apiURL}/token/refresh/`, {
            refresh,
          });

          const newToken = response.data.access;
          config.headers.Authorization = `Bearer ${newToken}`;

          // Actualizar el token en el almacenamiento local
          saveState("user", { token: newToken, user: info.username });
        } catch (error) {
          // Manejar el error de renovación (puedes redirigir a la página de inicio de sesión, por ejemplo)
          console.error("Error during token refresh:", error);
          // Puedes manejar el error según tus necesidades, por ejemplo, redirigir a la página de inicio de sesión
          window.location.href = "/login";
        }
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
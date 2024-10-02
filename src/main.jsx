import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { CartContextProvider } from "./context/CartContext";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <AuthContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </AuthContextProvider>
  </HashRouter>
);

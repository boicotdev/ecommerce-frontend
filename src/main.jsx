import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { CartContextProvider } from "./context/CartContext";
import { ShopContextProvider } from "./context/ShopContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <AuthContextProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 1500,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <CartContextProvider>
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  </HashRouter>
);

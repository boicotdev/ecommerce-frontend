import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { CartContextProvider } from "./context/CartContext";
import { ShopContextProvider } from "./context/ShopContext.jsx";
import "./index.css";
import { CustomLocalStorageProvider } from "./hooks/CustomHooks.jsx";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <CustomLocalStorageProvider>
      <CartContextProvider>
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
          <ShopContextProvider>
            <App />
          </ShopContextProvider>
        </AuthContextProvider>
      </CartContextProvider>
    </CustomLocalStorageProvider>
  </HashRouter>
);

import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import AdminHeader from "./components/AdminHeader";
import Footer from "./components/Footer";
import CreateComment from "./components/CreateComment";
import CreateProduct from "./components/CreateProduct";
import ProductList from "./components/ProductList";
import Clients from "./pages/Clients";
import ProductDetails from "./pages/ProductDetails";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import ShopPage from "./pages/Shop";
import MyAccount from "./pages/MyAccount";
import AuthView from "./pages/AuthView";
import Contact from "./pages/Contact";
import DashboardAdmin from "./pages/DasboardAdmin";
import OrderDetails from "./pages/OrderDetails";
import AdminProtectedRoute from "./routes/ProtectedAdminRoute";
import { useAuth } from "./context/AuthContext";
import { useCart } from "./context/CartContext";
import PrivateUserRoute from "./routes/ProtectedUserRoute";

import { loadState } from "./utils/utils";
import { useShop } from "./context/ShopContext";
import { getProducts } from "./api/actions.api";
import EditProduct from "./pages/EditProduct";
import ProductAdminDetails from "./pages/ProductAdminDetails";
import CreateUserClient from "./components/CreateUserClient";

function App() {
  const { setProducts } = useShop();
  const navigate = useNavigate();

  const { isAdmin, isLoggedIn, setIsLoggedIn, setUser, setIsAdmin } = useAuth();
  const { setOrders, setItems } = useCart();

  useEffect(() => {
    const { id, username, is_superuser, avatar } = loadState("user");
    if (id && username && is_superuser) {
      setIsLoggedIn(true);
      setIsAdmin(true);
      setUser({ id, username, is_superuser, avatar });
    } else if (id && username && !is_superuser) {
      setIsLoggedIn(true);
      setIsAdmin(false);
      setUser({ id, username, is_superuser, avatar });
    }
    // Setear los items y ordenes en el carrito
    const savedOrders = loadState("orders");
    if (savedOrders.length > 0) {
      setOrders(savedOrders);
      setItems(savedOrders);
    }
  }, []);

  return (
    <>
      {isLoggedIn && isAdmin ? <AdminHeader /> : <Header />}
      <Routes>
        <Route
          path="checkout"
          element={<PrivateUserRoute element={<CheckoutPage />} />}
        />
        <Route
          path="account"
          element={<PrivateUserRoute element={<MyAccount />} />}
        />
        <Route path="authenticate" element={<AuthView />} />
        <Route path="contact" element={<Contact />} />
        <Route
          path="dashboard"
          element={<AdminProtectedRoute element={<DashboardAdmin />} />}
        />
        <Route
          path="clientes"
          element={<AdminProtectedRoute element={<Clients />} />}
        /><Route
          path="clientes/create"
          element={<AdminProtectedRoute element={<CreateUserClient />} />}
        />
        <Route
          path="orders/order-details/:id"
          element={<PrivateUserRoute element={<OrderDetails />} />}
        />
        <Route
          path="comments/create-comment/:product-id"
          element={<PrivateUserRoute element={<CreateComment />} />}
        />
        <Route
          path="shop/create-product/"
          element={<AdminProtectedRoute element={<CreateProduct />} />}
        />
        <Route
          path="shop/products/"
          element={<AdminProtectedRoute element={<ProductList />} />}
        />
        {/* Routes without authentication required */}
        <Route path="/" element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="/shop/products/:sku/" element={<ProductDetails />} />
        <Route path="/shop/products/edit/:sku/" element={<EditProduct />} />
        <Route
          path="/dashboard/products/:sku/"
          element={<ProductAdminDetails />}
        />
        <Route path="*" element={<h1>Page not found</h1>} />

        {/* Routes without authentication required */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;

import {useState, useEffect} from "react";
import { Routes, Route } from "react-router-dom";
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

import  {loadState} from "./utils/utils";


function App() {

  const { isAdmin, isLoggedIn } = useAuth();
  const {setOrders, setItems} = useCart()
  
  useEffect(() => {
    const productOrders = loadState("orders");
    if(productOrders != null) {
      setOrders(productOrders)
      setItems(productOrders)
    }
  }, [])
  
  
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
          <Route path="/shop/products/:product/" element={<ProductDetails />} />
        {/* Routes without authentication required */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;

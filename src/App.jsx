import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import ShopPage from "./pages/Shop";
import MyAccount from "./pages/MyAccount";
import AuthView from "./pages/AuthView";
import Contact from './pages/Contact';
import DashboardAdmin from './pages/DasboardAdmin';
import './index.css'

function App() {

  return (
  <>
    <Header />
    <Routes>
      <Route path="/shop/products/:product/" element={<ProductDetails />} />
      <Route path="/" element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="shop" element={<ShopPage />} />
      <Route path="account" element={<MyAccount />} />
      <Route path="authenticate" element={<AuthView />} />
      <Route path="contact" element={<Contact />} />
      <Route path="dashboard" element={<DashboardAdmin />} />
      {/* Puedes agregar más rutas aquí si es necesario */}
    </Routes>
    <Footer />
  </>
);

}

export default App;

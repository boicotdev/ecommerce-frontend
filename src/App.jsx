import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AdminHeader from "./components/AdminHeader";
import Footer from "./components/Footer";
import CreateComment from "./components/CreateComment";
import CreateProduct from "./components/CreateProduct";
import ProductList from "./components/ProductList";
import ProductDetails from "./pages/ProductDetails";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import ShopPage from "./pages/Shop";
import MyAccount from "./pages/MyAccount";
import AuthView from "./pages/AuthView";
import Contact from './pages/Contact';
import DashboardAdmin from './pages/DasboardAdmin';
import OrderDetails from './pages/OrderDetails';
import './index.css'

function App() {
  const isAdmin = true; // Aquí controlas si es admin o no

  return (
    <>
      {isAdmin ? <AdminHeader /> : <Header />}
      <Routes>
        <Route path="/shop/products/:product/" element={<ProductDetails />} />
        <Route path="/" element={<HomePage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="account" element={<MyAccount />} />
        <Route path="authenticate" element={<AuthView />} />
        <Route path="contact" element={<Contact />} />
        <Route path="dashboard" element={<DashboardAdmin />} />
        <Route path="orders/order-details/:id" element={<OrderDetails />} />
        <Route path="comments/create-comment/:product-id" element={<CreateComment />} />
        <Route path="shop/create-product/" element={<CreateProduct />} />
        <Route path="shop/products/list/" element={<ProductList />} />
      </Routes>
      <Footer />
    </>
  );
}


export default App;

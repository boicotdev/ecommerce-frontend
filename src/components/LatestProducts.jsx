import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useShop } from "../context/ShopContext";
import { useEffect, useState } from "react";
import { getProducts } from "../api/actions.api";

function LatestProducts() {
  const { setProducts } = useShop();
  const [loading, setLoading] = useState(true);
  const [lastProducts, setLastProducts] = useState([]);

  useEffect(() => {
    // Fetch latest products from API
    const loadProducts = async () => {
      try {
        const response = await getProducts();
        if (response.status === 200) {
          setProducts(response.data);
          setLastProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Ultimos productos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {loading ? (
            <div className="col-span-full text-center">
              <p>Cargando productos...</p>
            </div>
          ) : (
            lastProducts &&
            lastProducts.length > 0 &&
            lastProducts
              .slice(0, 5)
              .map((item) => <ProductCard key={item.sku} item={item} />)
          )}
        </div>
        <div className="text-center">
          <Link
            to="/shop"
            className="inline-block bg-cyan-500 text-white text-lg font-semibold py-3 px-8 rounded-full hover:bg-cyan-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg"
          >
            Ir a la tienda
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LatestProducts;

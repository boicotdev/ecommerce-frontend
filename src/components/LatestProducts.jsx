import { Link } from 'react-router-dom';
import ProductCard from "./ProductCard";
import { products } from "../assets/assets";

function LatestProducts() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Ultimos productos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products && products.length > 0 ? (
            products.slice(0, 5).map(item => (
              <ProductCard key={item.sku} item={item} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 text-lg">
              No hay productos disponibles
            </p>
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
  )
}

export default LatestProducts;
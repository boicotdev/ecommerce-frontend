import ProductCard from "./ProductCard";
import {products} from "../assets/assets";
function LatestProducts() {
  return (
    <div className="mt-8 p-3">
      <h3 className="text-center text-zinc-700 text-2xl">Latest Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-beetween gap-8">
        {
          products && products.length > 0 ? (
            products.slice(0,5).map(item => (
              <ProductCard key={item.sku} item={item} />
            ))
          ) : (
          <span>nada nuevo</span>
          )
        }
      </div>
      <div className="p-2.5 rounded-lg shadow-lg bg-cyan-500 text-white text-lg text-center my-2 w-2/3">Ver todos los productos</div>
    </div>
    )
}

export default LatestProducts;
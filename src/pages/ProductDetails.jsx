import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../assets/assets";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { product: productName } = useParams();
  const [product, setProduct] = useState({});
  const { setItems, items } = useCart();
 
  const checkItem = (item) => {
    if (!item || !item.sku) return;
    const existingProduct = items.find(prod => prod.sku === item.sku);
    if (existingProduct) {
      setItems((prevItems) =>
        prevItems.map((prod) =>
          prod.sku === item.sku
            ? { ...prod, quantity: (prod.quantity || 0) + 1 }
            : prod
        )
      );
    } else {
      setItems((prevItems) => ([...prevItems, { ...item, quantity: 1 }]));
    }
  };

  const addProductToCart = (item) => {
    checkItem(item);
  }

  useEffect(() => {
    if (productName) {
      const item = products.find(item => item.name === productName);
      if (item) {
        setProduct(item);
      }
    }
  }, [productName]);

  if (!product.name) {
    return <div className="container mx-auto px-4 py-8 text-center">Cargando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-48 w-full object-cover md:h-full md:w-48" src={product.image} alt={product.name} />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Detalles del producto</div>
            <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h2>
            <div className="mt-2 flex items-center">
              {product.score && product.score.map((_, idx) => (
                <svg key={idx} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="mt-4 text-gray-500">{product.description}</p>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              <button
                onClick={() => addProductToCart(product)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Add to cart
                <svg className="ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
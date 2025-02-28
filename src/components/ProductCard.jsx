import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice, createCartID } from "../utils/utils";
import { apiImageURL } from "../api/baseUrls";
import { useCustomLocalStorage } from "../hooks/CustomHooks";
import { useState } from "react";

function ProductCard({ item }) {
  const { setItems, setOrders, setCartIsSaved } = useCart();
  const { saveState, loadState } = useCustomLocalStorage();
  const [isAdding, setIsAdding] = useState(false);

  const checkItem = (item) => {
    if (!item || !item.sku) return;

    setItems((prevItems) => {
      const product = prevItems.find((prod) => prod.sku === item.sku);
      let updatedItems;

      if (product) {
        updatedItems = prevItems.map((prod) =>
          prod.sku === item.sku
            ? { ...prod, quantity: (prod.quantity || 0) + 1 }
            : prod
        );
      } else {
        updatedItems = [...prevItems, { ...item, quantity: 1 }];
      }
      
      setOrders((prev) => {
        [...updatedItems];
        saveState("orders", updatedItems);
      });
      return updatedItems;
    });
  };

  const addProductAtToCart = async (item) => {
    setIsAdding(true);
    try {
      if (loadState("CartID") === null) {
        const cartID = createCartID();
        saveState("CartID", cartID);
        saveState("cartIsSaved", false);
        setCartIsSaved(false);
      }
      checkItem(item);
      // Simular un pequeño delay para mejor feedback visual
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col">
      {/* Imagen y badges */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          src={`${apiImageURL}${item.main_image}`}
          alt={item.name}
          loading="lazy"
        />
        {item.best_seller && (
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Popular
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex-1">
          <Link
            to={`/shop/products/${item.sku}/`}
            className="inline-block mb-2 hover:underline"
          >
            <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
              {item.name}
            </h3>
          </Link>

          {/* Rating */}
          {item.score && item.votes > 0 && (
            <div className="flex items-center gap-1 mb-3">
              <div className="flex">
                {item.score.map((_, idx) => (
                  <svg
                    key={idx}
                    className="w-4 h-4 text-amber-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">
                ({item.votes} reseñas)
              </span>
            </div>
          )}

          {/* Descripción opcional */}
          {item.description && (
            <p className="text-sm text-gray-500 line-clamp-2 mb-4">
              {item.description}
            </p>
          )}
        </div>

        {/* Precio y botón */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-900">
              ${formatPrice(item.price)}
            </span>
            {item.stock > 0 ? (
              <span className="text-xs text-emerald-600">
                {item.stock} disponibles
              </span>
            ) : (
              <span className="text-xs text-red-600">
                Agotado
              </span>
            )}
          </div>
          
          <button
            onClick={() => addProductAtToCart(item)}
            disabled={isAdding || item.stock === 0}
            className={`
              flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
              ${item.stock === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : isAdding
                  ? 'bg-emerald-100 text-emerald-800 cursor-wait'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }
            `}
          >
            {isAdding ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Agregando...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {item.stock === 0 ? 'Agotado' : 'Agregar'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
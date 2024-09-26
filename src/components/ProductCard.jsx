import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({item}) {
  const {setItems, items} = useCart();
 
  const checkItem = (item) => {
    if (!item || !item.sku) return;
    // Encontramos el producto en el carrito
    const product = items.find(prod => prod.sku === item.sku);
    // Si el producto ya existe en el carrito
    if (product) {
      setItems((prevItems) =>
        prevItems.map((prod) =>
          prod.sku === item.sku
            ? { ...prod, quantity: (prod.quantity || 0) + 1 } // Aumenta la cantidad, asegurando que quantity es válida
            : prod
        )
      );
    } else {
      // Si el producto no está en el carrito, lo añadimos con cantidad 1
      setItems((prevItems) => (
        [...prevItems, { ...item, quantity: 1 }]
      ));
    }
  };

  const addProductAtToCart = (item) => {
    checkItem(item)
  }
  
  return (
    <div className="shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="p-4">
        <h5 className="text-lg font-semibold text-slate-700 my-3">
          <span className="font-bold text-slate-900">Product Name : </span>
          <Link to={`/shop/products/${item.name}/`} className="hover:text-cyan-600 transition-colors">
            {item.name}
          </Link>
        </h5>
        <div className="relative">
          <img className="rounded-lg w-full h-48 object-cover" src={item.image} alt={item.name}/>
          <span className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded-full text-xs font-bold">
            ${item.price}
          </span>
        </div>
        <div className="flex items-center my-2">
          {item.score && item.score.map((_, idx) => (
            <svg key={idx} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>

        <p className="text-slate-500 mb-2 mt-2">
          <span className="font-bold text-slate-900">Product Description : </span>
          {item.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-cyan-500 text-lg font-bold">${item.price}</span><button
          onClick={() => addProductAtToCart(item)}
          className=" bg-green-500 text-white py-2 px-2 rounded-md hover:bg-green-600 transition-colors duration-300 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Add to Cart
        </button>
         
        </div>
      </div>
    </div>
  )
}

export default ProductCard;
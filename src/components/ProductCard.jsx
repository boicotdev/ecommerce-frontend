import {Link} from "react-router-dom";
import {useCart} from "../context/CartContext";
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
      <div className="shadow-lg rounded-lg">
        <Link to="#">
          <div className="p-2.5">
            <h5 className="text-normal text-slate-700 my-3"><span className="text-bold text-slate-900">Product Name : </span> {item.name}</h5>
            <img className="rounded-lg" src={item.image} alt={item.name}/>
            <span className="mt-2">
              {
                item.score && (
                item.score.map((score, idx) => (
                  <i key={idx} className="fa fa-star text-yellow-400"></i>
                ))
                )
              }
            </span>
            <p className="text-slate-500 mb-2"><span className="text-bold text-slate-900">Product Description : </span>{item.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-cyan-500 text-lg">${item.price}</span>
              <a className="rounded-lg p-1.5 bg-green-500 transition-all hover:bg-green-600 text-white"
              onClick={() => addProductAtToCart(item)}
              >
                Añadir al carrito +
              </a>
            </div>
          </div>
        </Link>
      </div>
    )

}

export default ProductCard;
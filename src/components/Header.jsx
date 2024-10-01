import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import menuIcon from "../assets/menuIcon.svg";
import { useCart } from "../context/CartContext";

function Header() {
  const { items, setItems } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [showItems, setShowItems] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const removeItem = (sku) => {
    const item = cartItems.find(item => item.sku === sku);
    const response = confirm(`Desea eliminar el ${item.name}`)
    if(item && response) {
      setItems((prevItems) => (
        prevItems.filter(item => item.sku !== sku )
      ))
      setCartItems((prevItems) => (
        prevItems.filter(item => item.sku !== sku)
      ))
    }
  }
  
  const CartItem = ({item, quantity, subTotal}) => {
    return (
      <>
        <div className="flex justify-between items-center gap-2 text-xs md:text-sm lg:text-base py-2">
          <span className="font-medium">{item.name}</span>
          <span>Items ({quantity})</span>
          <span className="font-semibold">${subTotal.toFixed(2)}</span>
          <button onClick={() => removeItem(item.sku)} className="bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors">
            <i className="fa fa-trash"></i>
          </button>
        </div>
        <hr className="border-gray-200" />
      </>
    )
  }

  const totalPricePerItem = (product) => {
    const foundItem = cartItems.find(item => item.sku === product.sku);
    return foundItem ? product.price * (foundItem.quantity || 1) : 0;
  };

  const totalPrice = () => {
    return items.reduce((accum, item) => accum + (item.price * (item.quantity || 1)), 0);
  }

  useEffect(() => {
    if (items.length > 0) {
      setCartItems(items);
    }
  }, [items]);

  return (
    <>
      {showItems && (
        <div className="fixed w-full max-w-md shadow-lg rounded-lg p-4 top-16 right-4 bg-white z-50">
          <h3 className="text-lg font-semibold mb-2">Cart Items</h3>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item, idx) => (
              <CartItem 
                key={idx} 
                item={item} 
                quantity={item.quantity || 1} 
                subTotal={totalPricePerItem(item)} 
              />
            ))
          ) : (
            <p className="text-gray-500">Aún no se han agregado productos al carrito</p>
          )}
          <div className="mt-4 flex justify-between items-center">
            {cartItems && cartItems.length > 0 && (
              <>
                <p className="text-lg font-bold">Total ${totalPrice().toFixed(2)}</p>
                <Link to="checkout" onClick={() => setShowItems(false)} className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors">
                  Proceder al pago
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      <header className="fixed z-50 top-0 flex justify-between items-center px-4 w-full h-16 bg-slate-900 shadow-md">
        <h1 className="text-slate-50 text-xl font-bold">
          <Link to="/" className="hover:text-slate-200 transition-colors">Raíces Verdes</Link>
        </h1>

        <nav className="hidden lg:block">
          <ul className="flex space-x-6 text-slate-200">
            <li><Link to="/" className="hover:text-white transition-colors">Inicio</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">Shop</Link></li>
            <li><Link to="/#about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link to="/account" className="hover:text-white transition-colors">Mi cuenta</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contactenos</Link></li>
            <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
            <li><Link to="/authenticate" className="hover:text-white transition-colors py-2 px-6 rounded-2xl bg-indigo-500 hover:bg-indigo-600">Login</Link></li>
          </ul>
        </nav>

        {isOpen && (
          <nav className="fixed inset-0 bg-slate-900 bg-opacity-95 z-50 flex flex-col justify-center items-center">
            <button
              className="absolute top-5 right-5 text-white text-3xl"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
            <ul className="flex flex-col items-center space-y-6 text-white text-xl">
              <li><Link to="/" onClick={() => setIsOpen(false)} className="hover:text-slate-300 transition-colors">Inicio</Link></li>
              <li><Link to="/shop" onClick={() => setIsOpen(false)} className="hover:text-slate-300 transition-colors">Shop</Link></li>
              <li><Link to="/#about" onClick={() => setIsOpen(false)} className="hover:text-slate-300 transition-colors">About</Link></li>
              <li><Link to="/account" onClick={() => setIsOpen(false)} className="hover:text-slate-300 transition-colors">Mi cuenta</Link></li>
              <li><Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-slate-300 transition-colors">Contactenos</Link></li>
              <li><Link to="/dashboard" onClick={() => setIsOpen(false)} className="hover:text-slate-300 transition-colors">Dashboard</Link></li>
              <li><Link to="/authenticate" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors py-2 px-6 rounded-2xl bg-indigo-500 hover:bg-indigo-600">Login</Link></li>
            </ul>
          </nav>
        )}
      
        <div className="flex items-center space-x-4">
          <button className="relative" onClick={() => setShowItems(!showItems)}>
            <i className="fa fa-shopping-cart text-2xl text-slate-200 hover:text-white transition-colors"></i>
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {cartItems.reduce((acum, item) => acum + (item.quantity || 0), 0)}
            </span>
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden"
          >
            <img
              className="w-8 cursor-pointer"
              src={menuIcon}
              alt="menu"
            />
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import menuIcon from "../assets/menuIcon.svg";
import {useCart} from "../context/CartContext";


function Header() {
  const {items, setItems} = useCart();
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
        <div className="flex justify-between items-center gap-2 text-xs md:text-lg lg:text-xl">
          <span>{item.name}|</span>
          <span>Items ({quantity})|</span>
          <span>Sub Total ${subTotal}</span>
          <span onClick={() => removeItem(item.sku)}><i className="fa fa-trash bg-red-600 text-slate-200 font-sm md:font-lg rounded-sm p-1.5 mr-3"></i></span>
        </div>
        <hr />
      </>
    )
}

  


  // get the total price per item
  const totalPricePerItem = (product) => {
    const foundItem = cartItems.find(item => item.sku === product.sku);
    return foundItem ? product.price * (foundItem.quantity || 1) : 0;
  };

  
  // get the total price
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
      { showItems && (
      <div className="fixed w-full shadow-lg rounded-lg p-2 top-12 left-1 md:left-5 bg-slate-100">
        <span>Items</span>
        {
          cartItems && cartItems.length > 0 ? (
            cartItems.map((item, idx) => (
             <CartItem 
              key={idx} 
              item={item} 
              quantity={item.quantity || 1} 
              subTotal={totalPricePerItem(item)} 
              />
            ))
          ) : (
            <p>Aún no se han agredado productos al carrito</p>
          )
        }
        <div className="mt-2 flex justify-between items-center">
          {
            cartItems && cartItems.length > 0 && (
            <>
              
              <p>Total ${totalPrice()}</p>
              <Link to="#" className="p-2 rounded-lg shadow-lg bg-green-400 hover:bg-green-500 text-white" >Proceder al pago</Link>
            </>
            )
          }
        </div>
      </div>)}
    <header className="flex justify-between items-center px-4 w-full h-14 bg-slate-900">
      <h1 className="text-slate-50 text-xl font-bold">
        <Link to="/">Ecommerce</Link>
      </h1>

      {/* Desktop Navbar */}
      <nav>
        <ul className="flex justify-between align-center hidden lg:flex">
          <li>
            <Link to="#">Inicio</Link>
          </li>
          <li>
            <Link to="#">Shop</Link>
          </li>
          <li>
            <Link to="#">About</Link>
          </li>
          <li>
            <Link to="#">My Account</Link>
          </li>
          <li>
            <Link to="#">Contact Us</Link>
          </li>
        </ul>
      </nav>

      {/* ----- Mobile Navbar ------ */}
      {isOpen && (
        <nav className="fixed top-0 left-0 w-full h-full bg-slate-900 z-50 flex flex-col justify-center items-center">
          {/* Close Button */}
          <button
            className="absolute top-5 right-5 text-white text-2xl"
            onClick={() => setIsOpen(false)}
          >
            &times; {/* This is the "X" symbol for closing */}
          </button>

          <ul className="flex flex-col items-center space-y-6 text-white text-xl">
            <li>
              <Link to="#" onClick={() => setIsOpen(false)}>Inicio</Link>
            </li>
            <li>
              <Link to="#" onClick={() => setIsOpen(false)}>Shop</Link>
            </li>
            <li>
              <Link to="#" onClick={() => setIsOpen(false)}>About</Link>
            </li>
            <li>
              <Link to="#" onClick={() => setIsOpen(false)}>My Account</Link>
            </li>
            <li>
              <Link to="#" onClick={() => setIsOpen(false)}>Contact Us</Link>
            </li>
          </ul>
        </nav>
      )}
      
    <div className="relative" onClick={() => setShowItems(!showItems)}>
      <i className="fa fa-shopping-cart text-2xl text-slate-200"></i>
      <span className="absolute bottom-5 left-5 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
        {cartItems.reduce((acum, item) => acum + (item.quantity), 0)}
      </span>
    </div>


      {/* Hamburger Icon */}
      <img
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 cursor-pointer lg:hidden"
        src={menuIcon}
        alt="menu"
      />
    </header>
    </>
  );
}

export default Header;
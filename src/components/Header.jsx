import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { formatPrice } from "../utils/utils"
import { useCustomLocalStorage } from "../hooks/CustomHooks"
import { cartCreate, cartDetails, cartItemsCreate } from "../api/actions.api"
import menuIcon from "../assets/menuIcon.svg"
import { apiImageURL } from "../api/baseUrls"

function Header() {
  const { items, setItems, setOrders, setCartIsSaved } = useCart()
  const [cartItems, setCartItems] = useState([])
  const [showItems, setShowItems] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { isAdmin, isLoggedIn, handleLogout } = useAuth()
  const { saveState, loadState } = useCustomLocalStorage()
  const navigate = useNavigate()

  const removeItem = (sku) => {
    const item = cartItems.find((item) => item.sku === sku)
    const response = confirm(`Desea eliminar el ${item.name}`)

    if (item && response) {
      setItems((prevItems) => prevItems.filter((item) => item.sku !== sku))
      setCartItems((prevItems) => {
        const updatedItems = prevItems.filter((item) => item.sku !== sku)
        if (updatedItems.length > 0) {
          saveState("orders", updatedItems)
        } else {
          localStorage.removeItem("CartID")
          localStorage.removeItem("orders")
          saveState("cartIsSaved", false)
          setCartIsSaved(false)
        }
        return updatedItems
      })
      setOrders((prevOrders) => items.filter((item) => item.sku !== sku))
    }
  }

  //handle cart items creation
  const createCartItems = async () => {
    try {
      const orders = loadState("orders").map((cartItem) => {
        return {
          quantity: cartItem.quantity,
          product: cartItem.id,
        }
      })
      const response = await cartItemsCreate({
        data: {
          items: orders,
          cart_id: loadState("CartID"),
        },
      })
      if (response.status === 201) {
        toast.success("Productos añadidos al carrito exitosamente")
      }
    } catch (error) {
      const { response } = error
      console.error(error)
      console.error(response)
      toast.error("Error al crear los productos del carrito")
    }
  }

  const handleCartCreation = async () => {
    //check if the current user is a superuser
    const user = loadState("user")
    if (user.is_superuser) return

    try {
      const response = await cartCreate({
        user: loadState("user")["id"],
        name: loadState("CartID"),
        description: `Cart created at ${new Date().toDateString()}`,
      })
      if (response.status === 201) {
        setCartIsSaved(true)
        saveState("cartIsSaved", true)
        saveState("CartID", response.data.name)
        toast.success("Carrito creado exitosamente")
      }
    } catch (error) {
      const { response } = error
      console.error(response)
    } finally {
      await createCartItems()
    }
  }

  const handleToggleMenu = async () => {
    const user = loadState("user")
    const cartExists = loadState("cartIsSaved")
    const ID = loadState("CartID")
    if (!ID) {
      // Si no existe un CartID, intenta crearlo
      await handleCartCreation()
    }
    if (!user) {
      navigate("/checkout")
    }
    if (!cartExists && ID) {
      /**  Si el carrito ya existe pero no está guardado, intenta crear los productos asociados
      primero se verifica que el cart exista */
      try {
        const response = await cartDetails(ID)
        if (response.status === 200) {
          await createCartItems()
        }
      } catch (error) {
        const { response } = error
        const { data } = response
        console.error(error)
        if (!data.exists) {
          await handleCartCreation()
        }
      }
    }
    setShowItems(false)
    setIsOpen(false)
    navigate("/checkout")
  }

  const CartItem = ({ item, quantity, subTotal }) => {
    return (
      <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-emerald-100/50 flex items-center justify-center flex-shrink-0">
            {item.main_image ? (
              <img src={`${apiImageURL}${item.main_image}` || "/placeholder.svg"} alt={item.name} className="w-10 h-10 object-cover rounded" />
            ) : (
              <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            )}
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
            <p className="text-sm text-gray-500">${formatPrice(item.price)}</p>
          </div>
        </div>

        <span className="text-sm text-gray-600 tabular-nums">×{quantity}</span>

        <span className="text-sm font-medium text-gray-900 tabular-nums">${formatPrice(subTotal)}</span>

        <button
          onClick={() => removeItem(item.sku)}
          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
          aria-label={`Eliminar ${item.name} del carrito`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    )
  }

  const totalPricePerItem = (product) => {
    const foundItem = cartItems.find((item) => item.sku === product.sku)
    return foundItem ? product.price * (foundItem.quantity || 1) : 0
  }

  const totalPrice = () => {
    return items.reduce((accum, item) => accum + item.price * (item.quantity || 1), 0)
  }

  useEffect(() => {
    if (items.length > 0) {
      setCartItems(items)
    }
  }, [items])

  return (
    <>
      {/* Cart Dropdown */}
      {showItems && (
        <>
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setShowItems(false)} />
          <div className="fixed right-4 top-20 w-full max-w-md bg-white rounded-xl shadow-xl z-50 overflow-hidden border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Carrito de compras</h3>
                <button
                  onClick={() => setShowItems(false)}
                  className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[60vh]">
              {cartItems && cartItems.length > 0 ? (
                cartItems.map((item, idx) => (
                  <CartItem key={idx} item={item} quantity={item.quantity || 1} subTotal={totalPricePerItem(item)} />
                ))
              ) : (
                <div className="p-8 text-center">
                  <svg
                    className="w-12 h-12 text-gray-300 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <p className="text-gray-500">Tu carrito está vacío</p>
                  <Link
                    to="/shop"
                    className="mt-4 inline-block text-sm text-emerald-600 hover:text-emerald-700"
                    onClick={() => setShowItems(false)}
                  >
                    Continuar comprando
                  </Link>
                </div>
              )}
            </div>

            {cartItems && cartItems.length > 0 && (
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Total</span>
                  <span className="text-lg font-semibold text-gray-900">${formatPrice(totalPrice())}</span>
                </div>
                <button
                  onClick={handleToggleMenu}
                  className="w-full px-4 py-3 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
                >
                  Proceder al pago
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Header */}
      <header className="fixed z-40 top-0 left-0 right-0 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-lg font-semibold text-emerald-700 hover:text-emerald-800 transition-colors">
              Surti campos y cosechas
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block">
              <ul className="flex items-center space-x-8">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Tienda
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Contactenos
                  </Link>
                </li>
                {isLoggedIn && isAdmin && (
                  <li>
                    <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to="/account"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                  >
                    Mi cuenta
                  </Link>
                </li>
                {isLoggedIn && (
                  <li>
                    <button onClick={handleLogout} className="text-gray-600 hover:text-gray-900 transition-colors">
                      Salir
                    </button>
                  </li>
                )}
              </ul>
            </nav>

            {/* Cart and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setShowItems(!showItems)}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cartItems && cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-medium text-white bg-emerald-600 rounded-full">
                    {cartItems.reduce((accum, item) => accum + item.quantity, 0)}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <img src={menuIcon} alt="Menu" className="w-6 h-6 bg-emerald-400" />
              </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
              <div className="lg:hidden fixed inset-0 z-50 bg-white">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <Link to="/" className="text-lg font-semibold text-emerald-700" onClick={() => setIsOpen(false)}>
                      Surti campos y cosechas
                    </Link>
                    <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-gray-500">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <nav className="flex-1 overflow-y-auto p-4">
                    <ul className="space-y-6">
                      <li>
                        <Link
                          to="/"
                          onClick={() => setIsOpen(false)}
                          className="text-lg text-gray-600 hover:text-gray-900"
                        >
                          Inicio
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/shop"
                          onClick={() => setIsOpen(false)}
                          className="text-lg text-gray-600 hover:text-gray-900"
                        >
                          Tienda
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/about"
                          onClick={() => setIsOpen(false)}
                          className="text-lg text-gray-600 hover:text-gray-900"
                        >
                          Nosotros
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/contact"
                          onClick={() => setIsOpen(false)}
                          className="text-lg text-gray-600 hover:text-gray-900"
                        >
                          Contactenos
                        </Link>
                      </li>
                      {isLoggedIn && isAdmin && (
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="text-lg text-gray-600 hover:text-gray-900"
                          >
                            Dashboard
                          </Link>
                        </li>
                      )}
                    </ul>
                  </nav>

                  <div className="p-4 border-t border-gray-100">
                    <Link
                      to="/account"
                      onClick={() => setIsOpen(false)}
                      className="block w-full px-4 py-3 text-center text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Mi cuenta
                    </Link>
                    {isLoggedIn && (
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsOpen(false)
                        }}
                        className="mt-4 block w-full px-4 py-3 text-center text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Salir
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  )
}

export default Header


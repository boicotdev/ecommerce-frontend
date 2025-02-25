"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { createCartID, formatPrice } from "../utils/utils"
import { apiImageURL } from "../api/baseUrls"
import { retrieveProductDetails } from "../api/actions.api"
import { useCustomLocalStorage } from "../hooks/CustomHooks"
import toast from "react-hot-toast"

function ProductDetails() {
  const { sku } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [addingToCart, setAddingToCart] = useState(false)
  const { setItems, setOrders } = useCart()
  const { loadState, saveState } = useCustomLocalStorage()

  useEffect(() => {
    const retrieveProduct = async () => {
      try {
        setLoading(true)
        const response = await retrieveProductDetails(sku)
        if (response.status === 200) {
          setProduct(response.data)
        }
      } catch (error) {
        console.error(error)
        setError("No se pudo cargar el producto")
      } finally {
        setLoading(false)
      }
    }
    retrieveProduct()
  }, [sku])

  const addToCart = async (item) => {
    try {
      setAddingToCart(true)

      if (!loadState("CartID")) {
        saveState("CartID", createCartID())
      }

      setItems((prevItems) => {
        const existingProduct = prevItems.find((p) => p.sku === item.sku)
        const updatedItems = existingProduct
          ? prevItems.map((p) => (p.sku === item.sku ? { ...p, quantity: (p.quantity || 0) + 1 } : p))
          : [...prevItems, { ...item, quantity: 1 }]

        setOrders(() => {
          saveState("orders", updatedItems)
          return updatedItems
        })

        return updatedItems
      })

      toast.success("Producto añadido al carrito")
    } catch (error) {
      toast.error("Error al añadir al carrito")
    } finally {
      setAddingToCart(false)
    }
  }

  if (loading) {
    return <ProductSkeleton />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 sm:pt-32 flex items-center justify-center px-4">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">{error}</h3>
          <p className="mt-1 text-sm text-gray-500">Por favor, intenta nuevamente más tarde.</p>
        </div>
      </div>
    )
  }

  if (!product) return null

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 sm:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col">
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={`${apiImageURL}${product.main_image}`}
                alt={product.name}
                className="w-full h-full object-center object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            {/* Product badges */}
            <div className="mt-4 flex space-x-2">
              {product.organic && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Orgánico
                </span>
              )}
              {product.best_seller && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Más Vendido
                </span>
              )}
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>

            {/* Rating */}
            {product.votes > 0 && (
              <div className="mt-3">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <StarIcon
                        key={index}
                        className={`h-5 w-5 flex-shrink-0 ${
                          index < product.score ? "text-yellow-400" : "text-gray-300"
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="ml-2 text-sm text-gray-500">{product.votes} valoraciones</p>
                </div>
              </div>
            )}

            {/* Price */}
            <div className="mt-4">
              <p className="text-3xl text-gray-900">${formatPrice(product.price)}</p>
              {product.discount > 0 && (
                <p className="mt-1">
                  <span className="text-sm line-through text-gray-500">${formatPrice(product.original_price)}</span>
                  <span className="ml-2 text-sm text-red-500">{product.discount}% descuento</span>
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="sr-only">Descripción</h3>
              <div className="text-base text-gray-700 space-y-6">{product.description}</div>
            </div>

            {/* Product details */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-sm font-medium text-gray-900">Detalles</h3>
              <div className="mt-4 prose prose-sm text-gray-500">
                <ul role="list" className="space-y-2">
                  <li>Categoría: {product.category}</li>
                  {product.weight && <li>Peso: {product.weight}</li>}
                  {product.origin && <li>Origen: {product.origin}</li>}
                </ul>
              </div>
            </div>

            {/* Add to cart */}
            <div className="mt-8">
              <button
                type="button"
                onClick={() => addToCart(product)}
                disabled={addingToCart}
                className="w-full bg-cyan-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {addingToCart ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Añadiendo...
                  </>
                ) : (
                  <>
                    <ShoppingCartIcon className="h-5 w-5 mr-2" />
                    Añadir al carrito
                  </>
                )}
              </button>
            </div>

            {/* Stock status */}
            {product.stock <= 5 && product.stock > 0 && (
              <p className="mt-4 text-sm text-red-500">¡Solo quedan {product.stock} unidades!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function StarIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function ShoppingCartIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    </svg>
  )
}

function ProductSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 sm:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          <div className="animate-pulse">
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg" />
            <div className="mt-4 flex space-x-2">
              <div className="h-6 w-16 bg-gray-200 rounded-full" />
              <div className="h-6 w-16 bg-gray-200 rounded-full" />
            </div>
          </div>
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <div className="h-8 w-3/4 bg-gray-200 rounded" />
            <div className="mt-3 flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-5 w-5 bg-gray-200 rounded" />
              ))}
            </div>
            <div className="mt-4 h-8 w-1/4 bg-gray-200 rounded" />
            <div className="mt-6 space-y-6">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
            <div className="mt-8 h-12 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails


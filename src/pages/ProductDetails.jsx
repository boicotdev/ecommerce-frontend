"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { createCartID, formatPrice } from "../utils/utils"
import { apiImageURL } from "../api/baseUrls"
import { retrieveProductDetails } from "../api/actions.api"
import { useCustomLocalStorage } from "../hooks/CustomHooks"
import toast from "react-hot-toast"

// SVG de respaldo para productos sin imagen
const FallbackImage = ({ category = "default" }) => {
  // Diferentes SVGs según la categoría
  const svgs = {
    frutas: (
      <svg className="w-full h-full text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
        />
      </svg>
    ),
    verduras: (
      <svg className="w-full h-full text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 9l-3 3m0 0l-3-3m3 3V6" />
      </svg>
    ),
    legumbres: (
      <svg className="w-full h-full text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8v8m-4-4h8" />
      </svg>
    ),
    default: (
      <svg className="w-full h-full text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
      {svgs[category.toLowerCase()] || svgs.default}
    </div>
  )
}

function ProductDetails() {
  const { sku } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [addingToCart, setAddingToCart] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const { setItems, setOrders } = useCart()
  const { loadState, saveState } = useCustomLocalStorage()

  useEffect(() => {
    const retrieveProduct = async () => {
      try {
        setLoading(true)
        const response = await retrieveProductDetails(sku)
        if (response.status === 200) {
          setProduct(response.data)
          console.log(response.data)
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

  // Array de imágenes del producto (principal + adicionales)
  const productImages = [
    product.main_image,
    product.additional_image_1,
    product.additional_image_2,
    product.additional_image_3,
  ].filter(Boolean) // Filtra las imágenes null o undefined

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 sm:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Galería de imágenes */}
          <div className="flex flex-col">
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
              {productImages.length > 0 ? (
                <img
                  src={`${apiImageURL}${productImages[selectedImage]}`}
                  alt={`${product.name} - Imagen ${selectedImage + 1}`}
                  className="w-full h-full object-center object-cover hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <FallbackImage category={product.category} />
              )}
            </div>

            {/* Miniaturas */}
            {productImages.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-4">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
                      selectedImage === index ? "ring-2 ring-emerald-500" : "ring-1 ring-gray-200"
                    }`}
                  >
                    <img
                      src={`${apiImageURL}${image}`}
                      alt={`${product.name} - Miniatura ${index + 1}`}
                      className="w-full h-full object-center object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Badges del producto */}
            <div className="mt-4 flex space-x-2">
              {product.recommended && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  Recomendado
                </span>
              )}
              {product.best_seller && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  Más Vendido
                </span>
              )}
            </div>
          </div>

          {/* Información del producto */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>

            {/* Valoraciones */}
            {product.rank > 0 && (
              <div className="mt-3">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <StarIcon
                        key={index}
                        className={`h-5 w-5 flex-shrink-0 ${
                          index < product.score ? "text-amber-400" : "text-gray-300"
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="ml-2 text-sm text-gray-500">{product.rank} valoraciones</p>
                </div>
              </div>
            )}

            {/* Precio */}
            <div className="mt-4">
              <p className="text-3xl text-gray-900">${formatPrice(product.price)}</p>
              {product.discount > 0 && (
                <p className="mt-1">
                  <span className="text-sm line-through text-gray-500">${formatPrice(product.original_price)}</span>
                  <span className="ml-2 text-sm text-red-500">{product.discount}% descuento</span>
                </p>
              )}
            </div>

            {/* Descripción */}
            <div className="mt-6">
              <h3 className="sr-only">Descripción</h3>
              <div className="text-base text-gray-700 space-y-6">{product.description}</div>
            </div>

            {/* Detalles del producto */}
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

            {/* Añadir al carrito */}
            <div className="mt-8">
              <button
                type="button"
                onClick={() => addToCart(product)}
                disabled={addingToCart}
                className="w-full bg-emerald-600 border border-transparent rounded-lg py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
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
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Añadir al carrito
                  </>
                )}
              </button>
            </div>

            {/* Estado del stock */}
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

function ProductSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 sm:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          <div className="animate-pulse">
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg" />
            <div className="mt-4 grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg" />
              ))}
            </div>
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


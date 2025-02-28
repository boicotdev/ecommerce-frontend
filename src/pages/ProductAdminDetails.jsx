"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { retrieveProductDetails } from "../api/actions.api"
import { apiImageURL } from "../api/baseUrls"

export default function ProductAdminDetails() {
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { sku } = useParams()

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        const response = await retrieveProductDetails(sku)
        if (response.status === 200) {
          setProduct(response.data)
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        setError("No se pudo cargar el producto. Por favor, intente de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [sku])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center px-4">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Error</h3>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-sm rounded-xl overflow-hidden">
          {/* Encabezado */}
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Detalles del Producto</h2>
          </div>

          <div className="p-6">
            {/* Imagen del producto */}
            <div className="aspect-w-16 aspect-h-9 mb-6">
              <img
                src={`${apiImageURL}${product.main_image}`}
                alt={product.name}
                className="w-full h-[300px] object-cover rounded-lg"
              />
            </div>

            {/* Información del producto */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Nombre del producto</h3>
                  <p className="mt-1 text-base font-medium text-gray-900">{product.name}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Descripción</h3>
                  <p className="mt-1 text-base text-gray-900">{product.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Categoría</h3>
                  <p className="mt-1 text-base text-gray-900">{product.category}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Precio</h3>
                  <p className="mt-1 text-xl font-semibold text-emerald-600">${product.price}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Stock</h3>
                  <div className="mt-1 flex items-center">
                    <span className="text-base text-gray-900">{product.stock}</span>
                    <span
                      className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.stock > 10 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {product.stock > 10 ? "En stock" : "Stock bajo"}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg
                      className={`h-5 w-5 ${product.best_seller ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-2 text-sm text-gray-500">
                      {product.best_seller ? "Producto más vendido" : "No es producto más vendido"}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <svg
                      className={`h-5 w-5 ${product.recommended ? "text-emerald-500" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-2 text-sm text-gray-500">
                      {product.recommended ? "Producto recomendado" : "No es producto recomendado"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


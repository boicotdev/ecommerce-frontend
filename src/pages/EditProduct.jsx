"use client"

import { useState, useEffect } from "react"
import { retrieveProductDetails, updateProduct } from "../api/actions.api"
import { resetForm } from "../utils/utils"
import { toast } from "react-hot-toast"
import { retrieveCategoryList } from "../api/actions.api"
import { useNavigate, useParams } from "react-router-dom"
import Spinner from "../components/Spinner";

const EditProduct = () => {
  const [categories, setCategories] = useState([])
  const [product, setProduct] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const { sku } = useParams()
  const navigate = useNavigate()

  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("La imagen no debe superar los 5MB")
        return
      }
      setImage(file)
      setProduct({ ...product, main_image: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const registerProductUpdated = async () => {
    try {
      setIsSaving(true)
      if (!image) {
        const { main_image, ...productData } = product
        const response = await updateProduct(productData)
        if (response.status === 200) {
          toast.success("Producto actualizado exitosamente")
          resetForm("product-update__form")
          setImage(null)
          navigate("/dashboard/products")
        }
      } else {
        const response = await updateProduct(product)
        if (response.status === 200) {
          toast.success("Producto actualizado exitosamente")
          resetForm("product-update__form")
          setImage(null)
          navigate("/dashboard/products")
        }
      }
    } catch (error) {
      const message = error.response?.data?.message || "Error al actualizar el producto"
      toast.error(message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    registerProductUpdated()
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const [categoriesResponse, productResponse] = await Promise.all([
          retrieveCategoryList(),
          retrieveProductDetails(sku),
        ])

        if (categoriesResponse.status === 200) {
          setCategories(categoriesResponse.data)
        }

        if (productResponse.status === 200) {
          setProduct(productResponse.data)
          setPreview(`http://127.0.0.1:8000/${productResponse.data.main_image}`)
        }
      } catch (error) {
        console.error("Error loading data:", error)
        toast.error("Error al cargar los datos del producto")
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [sku])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="large" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold text-gray-900">Editar Producto</h2>
              <button
                onClick={() => navigate("/dashboard/products")}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form id="product-update__form" onSubmit={handleSubmit} className="space-y-6">
              {/* Imagen del producto */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Imagen del Producto</label>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {preview ? (
                      <img
                        src={preview || "/placeholder.svg"}
                        alt="Vista previa"
                        className="h-24 w-24 rounded-lg object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="h-24 w-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                        <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      id="image"
                      name="main_image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                    />
                    <p className="mt-1 text-xs text-gray-500">PNG, JPG hasta 5MB</p>
                  </div>
                </div>
              </div>

              {/* Información básica */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre del Producto
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={product.name || ""}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                    SKU
                  </label>
                  <input
                    type="text"
                    id="sku"
                    name="sku"
                    value={product.sku || ""}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Precio
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={product.price || ""}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      className="block w-full pl-7 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                    Stock
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={product.stock || ""}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Descripción */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={product.description || ""}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                ></textarea>
              </div>

              {/* Categoría */}
              <div>
                <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
                  Categoría
                </label>
                <select
                  id="category_id"
                  name="category_id"
                  value={product.category_id || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                >
                  <option value="">Seleccione una categoría</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botones de acción */}
              <div className="flex items-center justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/products")}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <Spinner size="small" className="mr-2" />
                      Guardando...
                    </>
                  ) : (
                    "Guardar Cambios"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProduct


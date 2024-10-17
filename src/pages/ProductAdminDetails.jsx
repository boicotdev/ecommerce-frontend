import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { retrieveProductDetails } from "../api/actions.api";
import { apiImageURL } from "../api/baseUrls";

export default function ProductAdminDetails() {
  const [product, setProduct] = useState({});

  const { sku } = useParams();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await retrieveProductDetails(sku);
        if (response.status === 200) {
          setProduct(response.data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    loadProduct();
  },[sku])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Detalles del Producto
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-6">
              <img
                src={`${apiImageURL}${product.main_image}`}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">
                Nombre del producto
              </h3>
              <p className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-50 rounded-md shadow-sm">
                {product.name}
              </p>
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">
                Descripción
              </h3>
              <p className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-50 rounded-md shadow-sm">
                {product.description}
              </p>
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">
                Precio
              </h3>
              <p className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-50 rounded-md shadow-sm">
                ${product.price}
              </p>
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">Stock</h3>
              <p className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-50 rounded-md shadow-sm">
                {product.stock}
              </p>
            </div>
            <div className="mb-4">
              <h3 className="block text-sm font-medium text-gray-700">
                Categoría
              </h3>
              <p className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-50 rounded-md shadow-sm">
                {product.category_id}
              </p>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-sm font-medium text-gray-700 mr-2">
                Bestseller:
              </span>
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  product.best_seller
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.best_seller ? "Sí" : "No"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-2">
                Recomendado:
              </span>
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  product.recommended
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.recommended ? "Sí" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

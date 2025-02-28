import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { useShop } from "../context/ShopContext"
import { getProducts } from "../api/actions.api"
import ProductCard from "../components/ProductCard"

const categories = [
  {
    id: "fruits",
    name: "Frutas",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    id: "vegetables",
    name: "Verduras",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    id: "legumes",
    name: "Legumbres",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    id: "hortalizes",
    name: "Hortalizas",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    id: "others",
    name: "Otros",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
]

export default function ShopPage() {
  const { setProducts } = useShop()
  const [searchParams, setSearchParams] = useSearchParams()
  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Get search params
  const searchTerm = searchParams.get("search") || ""
  //const selectedCategories = searchParams.get("categories")?.split(",") || []
  const selectedCategories = useMemo(() => searchParams.get("categories")?.split(",") || [], [searchParams]);


  const updateSearchParams = (params) => {
    const newParams = new URLSearchParams(searchParams)
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
    })
    setSearchParams(newParams)
  }

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const response = await getProducts()
        if (response.status === 200) {
          setProducts(response.data)
          setAllProducts(response.data)
          setFilteredProducts(response.data)
        }
      } catch (error) {
        console.error(error)
        setError("Error al cargar los productos")
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [setProducts])

  // Filter products
  useEffect(() => {
    const filtered = allProducts.filter((product) => {
      const matchesSearch = searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
      const matchesCategory = selectedCategories.length ? selectedCategories.includes(product.category) : true
      return matchesSearch && matchesCategory
    })
    setFilteredProducts(filtered)
  }, [searchTerm, allProducts, selectedCategories])

  const handleSearch = (value) => {
    updateSearchParams({ search: value || null })
  }

  const handleCategoryToggle = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]

    updateSearchParams({
      categories: newCategories.length ? newCategories.join(",") : null,
    })
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
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
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            Recargar página
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Nuestra Tienda</h1>
          <p className="mt-4 text-lg text-gray-600">Descubre nuestra selección de productos frescos y orgánicos</p>
        </div>

        {/* Filters */}
        <div className="space-y-8 mb-12">
          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Buscar productos..."
                className="block w-full rounded-lg border-gray-300 pl-10 focus:border-cyan-500 focus:ring-cyan-500"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Categorías</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryToggle(category.name)}
                  className={`flex items-center justify-center px-4 py-3 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                    selectedCategories.includes(category.name)
                      ? "bg-cyan-50 border-cyan-200 text-cyan-700"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Sections */}
        {loading ? (
          <ProductsSkeleton />
        ) : (
          <>
            <ProductSection title="Productos Recomendados" products={filteredProducts.filter((p) => p.recommended)} />
            <ProductSection title="Más Vendidos" products={filteredProducts.filter((p) => p.best_seller)} />
            <ProductSection title="Todos los Productos" products={filteredProducts} />
          </>
        )}
      </div>
    </div>
  )
}

function ProductSection({ title, products }) {
  if (products.length === 0) {
    return null
  }

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{title}</h2>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </section>
  )
}

function ProductsSkeleton() {
  return (
    <div className="space-y-16">
      {[...Array(3)].map((_, sectionIndex) => (
        <div key={sectionIndex} className="animate-pulse">
          <div className="h-8 w-64 bg-gray-200 rounded mb-8" />
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {[...Array(4)].map((_, productIndex) => (
              <div key={productIndex} className="space-y-4">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}


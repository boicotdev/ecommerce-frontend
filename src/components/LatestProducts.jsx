"use client"

import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import { useShop } from "../context/ShopContext"
import { getProducts, getUserComments } from "../api/actions.api"

function LatestProducts() {
  const { setProducts, setTestimonials } = useShop()
  const [loading, setLoading] = useState(true)
  const [lastProducts, setLastProducts] = useState([])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProducts()
        if (response.status === 200) {
          setProducts(response.data)
          setLastProducts(response.data)
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [setProducts])

  useEffect(() => {
    const loadComments = async () => {
      try {
        const response = await getUserComments()
        if (response.status === 200) {
          setTestimonials(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    loadComments()
  }, [setTestimonials])

  return (
    <section className="relative overflow-hidden bg-gray-50 py-16 sm:py-24">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 bg-gradient-radial from-cyan-50 to-transparent opacity-50" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center rounded-full bg-cyan-50 px-4 py-1.5 text-sm font-medium text-cyan-700 ring-1 ring-inset ring-cyan-600/20">
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
            Productos Destacados
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Últimos Productos</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Descubre nuestra más reciente selección de productos frescos y orgánicos
          </p>
        </div>

        {/* Products Grid */}
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            // Skeleton Loading
            [...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse rounded-2xl bg-white p-4 shadow-sm">
                <div className="aspect-square w-full rounded-xl bg-gray-200" />
                <div className="mt-4 space-y-3">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-4 w-1/2 rounded bg-gray-200" />
                  <div className="h-8 w-1/3 rounded-full bg-gray-200" />
                </div>
              </div>
            ))
          ) : lastProducts && lastProducts.length > 0 ? (
            lastProducts.slice(0, 6).map((item) => (
              <div key={item.sku} className="transform transition duration-300 hover:scale-105">
                <ProductCard item={item} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center">
              <div className="rounded-lg bg-white p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No hay productos</h3>
                <p className="mt-1 text-sm text-gray-500">Vuelve más tarde para ver nuevos productos.</p>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <Link
            to="/shop"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-cyan-500 px-8 py-4 text-white transition duration-300 ease-out hover:bg-cyan-600"
          >
            <span className="absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-cyan-600 transition-all duration-300 group-hover:translate-x-0">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <span className="relative flex items-center gap-2 text-base font-semibold transition-all duration-300 group-hover:translate-x-4">
              Ver todos los productos
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default LatestProducts


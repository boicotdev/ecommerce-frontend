import { useState, useEffect } from "react";
// import { products } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import { Link, useLocation } from "react-router-dom";
import { capitalize } from "../utils/utils";
import { useShop } from "../context/ShopContext";
import { getProducts } from "../api/actions.api";

const categories = ["Frutas", "Verduras", "Legumbres", "Otros"];

export default function ShopPage() {
  const { setProducts } = useShop();
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProducts();
        if (response.status === 200) {
          setProducts(response.data);
          setAllProducts(response.data);
          setFilteredProducts(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    loadProducts();
  }, []);

  // Set initial category based on URL parameter
  useEffect(() => {
    if (category) {
      // Capitaliza la categoría de la URL
      const capitalizedCategory = capitalize(category);
      // Actualiza las categorías seleccionadas
      setSelectedCategories([capitalizedCategory]);

      // Filtra productos usando la categoría de la URL
      const filtered = allProducts.filter(
        (product) =>
          (searchTerm === "" ||
            product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (selectedCategories.length === 0 ||
            [capitalizedCategory].includes(product.category))
      );
      setFilteredProducts(filtered);
    }
  }, [category, allProducts, searchTerm]);

  // Update filtered products whenever searchTerm or selectedCategories changes
  useEffect(() => {
    const filtered = allProducts.filter(
      (product) =>
        (searchTerm === "" ||
          product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.category))
    );
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategories]);

  const handleCategoryChange = (category) => {
    // const selectedCategories = new URLSearchParams(`${window.location}/?category=${category}`)
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // const handleCategoryChange = (category) => {
  //   // Actualiza las categorías seleccionadas
  //   setSelectedCategories((prev) =>
  //     prev.includes(category)
  //       ? prev.filter((c) => c !== category) // Si la categoría ya está seleccionada, la elimina
  //       : [...prev, category] // Si no está seleccionada, la añade
  //   );

  //   // Actualiza la URL para reflejar la categoría seleccionada
  //   const searchParams = new URLSearchParams(window.location.search);
  //   if (selectedCategories.includes(category)) {
  //     searchParams.delete('category'); // Si se está deseleccionando, eliminar el parámetro
  //   } else {
  //     searchParams.set('category', category); // Si se está seleccionando, añadir o actualizar el parámetro
  //   }

  //   // Actualiza la URL sin recargar la página
  //   window.history.replaceState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
  // };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 mt-14">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
        Nuestra Tienda
      </h1>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          aria-label="Buscar productos"
        />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Categorías
        </h2>
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <Link to={`/shop/?category=${category}`}>
              <label
                key={category}
                className="inline-flex items-center cursor-pointer bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-gray-700">{category}</span>
              </label>
            </Link>
          ))}
        </div>
      </div>

      <ProductSection
        title="Productos Recomendados"
        products={filteredProducts.filter((p) => p.recommended)}
      />

      <ProductSection
        title="Más Vendidos"
        products={filteredProducts.filter((p) => p.best_seller)}
      />

      <ProductSection title="Todos los Productos" products={filteredProducts} />
    </div>
  );
}

function ProductSection({ title, products }) {
  return (
    <section className="mb-12" key={Math.ceil(Math.random() * 10)}>
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length === 0 && (
          <p className="text-sm text-gray-500">No hay productos disponibles.</p>
        )}
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
      </div>
    </section>
  );
}

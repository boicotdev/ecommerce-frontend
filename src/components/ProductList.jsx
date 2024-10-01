import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

// Datos de ejemplo (en una aplicación real, estos vendrían de una API)
const sampleProducts = [
  { id: 1, name: 'Camiseta', category: 'Ropa', price: 19.99, stock: 100, image: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Pantalón', category: 'Ropa', price: 39.99, stock: 50, image: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Zapatos', category: 'Calzado', price: 59.99, stock: 30, image: 'https://via.placeholder.com/50' },
  { id: 4, name: 'Gorra', category: 'Accesorios', price: 14.99, stock: 80, image: 'https://via.placeholder.com/50' },
  { id: 5, name: 'Reloj', category: 'Accesorios', price: 99.99, stock: 20, image: 'https://via.placeholder.com/50' },
  // ... más productos
];

function ProductList() {
  const [products, setProducts] = useState(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const productsPerPage = 5;
  const categories = ['Todos', ...new Set(products.map(product => product.category))];

  useEffect(() => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || selectedCategory === 'Todos' || product.category === selectedCategory)
    );
    setFilteredProducts(results);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const handleEdit = (id) => {
    // Aquí iría la lógica para editar el producto
    console.log(`Editar producto con id: ${id}`);
  };

  const handleView = (id) => {
    // Aquí iría la lógica para ver los detalles del producto
    console.log(`Ver detalles del producto con id: ${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Listado de productos</h1>

      {/* Filtros */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="mb-4 md:mb-0 p-2 border rounded-md w-full md:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded-md w-full md:w-auto"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <Link className="p-2 border rounded-md w-full md:w-auto mt-4 text-center text-white bg-green-500 hover:bg-green-600" to="/shop/create-product/">Crear Producto <i className="fa fa-plus ml-2"></i></Link>
      </div>

      {/* Lista de productos */}
      <div className="bg-white shadow-md rounded-lg overflow-x-scroll">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={product.image} alt={product.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.stock}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => handleView(product.id)} className="text-blue-600 hover:text-blue-900 mr-2">Ver</button>
                  <button onClick={() => handleEdit(product.id)} className="text-green-600 hover:text-green-900 mr-2">Editar</button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="mt-6 flex justify-center">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-4 py-2 border rounded-md ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-100'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
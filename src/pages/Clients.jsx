import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

// Datos de ejemplo (en una aplicación real, estos vendrían de una API)
const sampleUsers = [
  { id: 1, name: 'Carlos Alberto Guzmán', category: 'Cliente', age: 19, since: "2024-09-18", email:"dummiemail@email.com", phone: "3123456789", address: "Bogotá 123", gender: "Female",  image: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Francisco el hombre', category: 'Cliente', age: 39, since: "2024-09-18", email:"dummiemail@email.com", phone: "3123456789", address: "Bogotá 123", gender: "Female",  image: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Roberto Goméz', category: 'Cliente', age: 59, since: "2024-09-18", email:"dummiemail@email.com", phone: "3123456789", address: "Bogotá 123", gender: "Female",  image: 'https://via.placeholder.com/50' },
  { id: 4, name: 'Maria Hurtado', category: 'Cliente', age: 14, since: "2024-09-18", email:"dummiemail@email.com", phone: "3123456789", address: "Bogotá 123", gender: "Female",  image: 'https://via.placeholder.com/50' },
  { id: 5, name: 'Oscar Lopéz', category: 'Cliente', age: 99, since: "2024-09-18", email:"dummiemail@email.com", phone: "3123456789", address: "Bogotá 123", gender: "Female",  image: 'https://via.placeholder.com/50' },
  { id: 6, name: 'Paula García', category: 'Cliente', age: 18, since: "2024-09-18", email:"dummiemail@email.com", phone: "3123456789", address: "Bogotá 123", gender: "Female",  image: 'https://via.placeholder.com/50' },
  { id: 7, name: 'Karen Yuliana Guzmán', category: 'Cliente', age: 6, since: "2024-04-17", email:"dummiemail@email.com", phone: "3123456789", address: "Bogotá 123", gender: "Female",  image: 'https://via.placeholder.com/50' },
  // ... más productos
];

function Clients() {
  const [users, setUsers] = useState(sampleUsers);
  const [filteredUsers, setFilteredUsers] = useState(sampleUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const usersPerPage = 5;
  const categories = ['Todos', ...new Set(users.map(product => product.category))];

  useEffect(() => {
    const results = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || selectedCategory === 'Todos' || user.category === selectedCategory)
    );
    setFilteredUsers(results);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, users]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleEdit = (id) => {
    // Aquí iría la lógica para editar el producto
    console.log(`Editar usuario con id: ${id}`);
  };

  const handleView = (id) => {
    // Aquí iría la lógica para ver los detalles del producto
    console.log(`Ver detalles del usuario con id: ${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Listado de clientes</h1>

      {/* Filtros */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Buscar clientes..."
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
        <Link className="p-2 border rounded-md w-full md:w-auto mt-4 text-center text-white bg-green-500 hover:bg-green-600" to="create">Crear Cliente <i className="fa fa-plus ml-2"></i></Link>
      </div>

      {/* Lista de productos */}
      <div className="bg-white shadow-md rounded-lg overflow-x-scroll">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Desde</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={user.image} alt={user.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.age}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.since}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => handleView(user.id)} className="text-blue-600 hover:text-blue-900 mr-2">Ver</button>
                  <button onClick={() => handleEdit(user.id)} className="text-green-600 hover:text-green-900 mr-2">Editar</button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="mt-6 flex justify-center">
        {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
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

export default Clients;
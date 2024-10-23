import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserClients } from "../api/actions.api";
import toast from "react-hot-toast";

function Clients() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const usersPerPage = 5;

  // Filtrado de usuarios por categoría y búsqueda
  {
    /* useEffect(() => {
    const results = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "" ||
          selectedCategory === "Todos" ||
          user.rol === selectedCategory)
    );
    setFilteredUsers(results);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, users]);*/
  }

  // Paginación
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Eliminar usuario
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este cliente?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  // Editar usuario
  const handleEdit = (id) => {
    console.log(`Editar usuario con id: ${id}`);
  };

  // Ver detalles del usuario
  const handleView = (id) => {
    console.log(`Ver detalles del usuario con id: ${id}`);
  };


  useEffect(() => {
    const retrieveClients = async () => {
      try {
        const response = await getUserClients();
        if (response.status === 200) {
          setUsers(response.data);
          setFilteredUsers(response.data);
        
        }
      } catch (error) {
        toast.error("Error en la llamada a la API:", error);
      }
    };
    retrieveClients();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Listado de clientes
      </h1>

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
          <option value="">Todos</option>
          <option value="Cliente">Cliente</option>
          {/* Agrega más categorías si las tienes */}
        </select>
        <Link
          className="p-2 border rounded-md w-full md:w-auto mt-4 text-center text-white bg-green-500 hover:bg-green-600"
          to="create"
        >
          Crear Cliente <i className="fa fa-plus ml-2"></i>
        </Link>
      </div>

      {/* Lista de clientes */}
      <div className="bg-white shadow-md rounded-lg overflow-x-scroll">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Desde
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          alt={user.username}
                          src={`http://127.0.0.1:8000/${user.avatar}`}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.rol}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.date_joined}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleView(user.id)}
                      className="text-blue-600 hover:text-blue-900 mr-2"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="text-green-600 hover:text-green-900 mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  No hay clientes disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="mt-6 flex justify-center">
        {Array.from(
          { length: Math.ceil(filteredUsers.length / usersPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-4 py-2 border rounded-md ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500 hover:bg-blue-100"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Clients;

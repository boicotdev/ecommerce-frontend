import { useState, useEffect } from "react";
import NewOrder from "../components/NewOrder";
import { Link } from "react-router-dom";
import { getOrders } from "../api/actions.api";
export default function Component() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [filter, setFilter] = useState("Pending");
  const [sort, setSort] = useState("date");
  const [createNewOrder, setCreateNewOrder] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const [showOptions, setShowOptions] = useState(false);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const retrieveOrders = async () => {
      try {
        const response = await getOrders();
        if (response.status === 200) {
          const data = response.data;
          const info = data.map((order) => {
            return {
              id: order.id,
              customer: `${order.user.first_name} ${order.user.last_name}`,
              date: order.creation_date,
              status: order.status,
              total: 0,
            };
          });
          setOrders(info);
        }
      } catch (error) {
        console.error(error);
      }
    };
    retrieveOrders();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100 overflow-auto lg:mt-16">
      <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid gap-4">
          <div className="flex flex-col md:flex-row lg:flex-row justify-between items-start gap-3 mt-3">
            <h1 className="text-2xl font-bold text-center md:text-left">
              Gestión de pedidos
            </h1>
            <button
              onClick={() => setCreateNewOrder(true)}
              className=" md:w-auto rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Crear Orden
            </button>
          </div>

          {createNewOrder && <NewOrder toggle={setCreateNewOrder} />}
          <div className="rounded-md border bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    type="button"
                    className="rounded-md border bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={toggleDropdown}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 inline-block"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filtrar
                    </span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="block px-4 py-2 text-sm text-gray-700">
                        Filtrar por
                      </div>
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        onClick={() => setFilter("Pending")}
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={filter === "Pending"}
                        />
                        Pendiente
                      </div>
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        onClick={() => setFilter("Shipped")}
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={filter === "Shipped"}
                        />
                        Preparada
                      </div>
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        onClick={() => setFilter("Delivered")}
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={filter === "Delivered"}
                        />
                        Entregada
                      </div>
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        onClick={() => setFilter("Cancelled")}
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={filter === "Cancelled"}
                        />
                        Cancelada
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    type="button"
                    className="rounded-md border bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={toggleDropdown}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 inline-block"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                      />
                    </svg>
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Ordenar
                    </span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="block px-4 py-2 text-sm text-gray-700">
                        filtrar por
                      </div>
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        onClick={() => setSort("date")}
                      >
                        <input
                          type="radio"
                          name="sort"
                          className="mr-2"
                          checked={sort === "date"}
                        />
                        Fecha
                      </div>
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        onClick={() => setSort("customer")}
                      >
                        <input
                          type="radio"
                          name="sort"
                          className="mr-2"
                          checked={sort === "customer"}
                        />
                        Cliente
                      </div>
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        onClick={() => setSort("status")}
                      >
                        <input
                          type="radio"
                          name="sort"
                          className="mr-2"
                          checked={sort === "status"}
                        />
                        Estado
                      </div>
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        onClick={() => setSort("total")}
                      >
                        <input
                          type="radio"
                          name="sort"
                          className="mr-2"
                          checked={sort === "total"}
                        />
                        Total
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="relative  md:grow-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-2.5 top-3 h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="search"
                  placeholder="Buscar pedido..."
                  className="w-full rounded-lg bg-white pl-8 py-1.5 ml-1 border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:w-[200px] lg:w-[336px]"
                />
              </div>
            </div>
            <div className="mt-4 overflow-auto sm:w-full lg:w-full" id="orders">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Pedído #
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Cliente
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Fecha
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Estado
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {orders && orders.length > 0 ? (
                    orders.map((order, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        {Object.keys(order).map((key) => (
                          <td
                            key={key}
                            className="px-4 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            {order[key]}
                          </td>
                        ))}
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="relative">
                            <button
                              type="button"
                              className="rounded-md bg-white p-2 text-gray-400 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              aria-haspopup="true"
                              onClick={() => setShowOptions(index)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                />
                              </svg>
                              <span className="sr-only">Acciones de ordén</span>
                            </button>
                            {showOptions === index && (
                              <div className="absolute z-10 right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Link
                                  to={`/orders/order-details/${order.id}/`}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Ver detalles
                                </Link>
                                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                  Editar
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                      >
                        No hay ordenes disponibles
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

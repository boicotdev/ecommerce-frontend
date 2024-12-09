import { useState, useEffect } from "react";
import Order from "./Order";
import Testimonial from "./Testimonial";

function Paginator({ sectionTitle, items, perPage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(perPage);

  useEffect(() => {
    setCurrentPage(1); // Reiniciar a la primera página cuando cambian los items
  }, [items]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          {sectionTitle}
        </h2>
        <div className="space-y-4">
          {/* Mostrar los pedidos */}
          {currentItems.length === 0 ? (
            <p className="text-lg font-semibold mb-4 text-gray-700">
              No hay pedidos registrados.
            </p>
          ) : sectionTitle === "Mis comentarios" ? (
            currentItems.map((testimonial) => (
              <Testimonial key={testimonial.id} testimonial={testimonial} />
            ))
          ) : (
            currentItems.map((order) => <Order key={order.id} order={order} />)
          )}
        </div>
        {/* Mostrar el paginador */}
        <div className="flex justify-between mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Anterior
          </button>
          <button
            disabled={indexOfLastItem >= items.length}
            onClick={() => paginate(currentPage + 1)}
            className={`px-3 py-1 rounded-md ${
              indexOfLastItem >= items.length
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default Paginator;

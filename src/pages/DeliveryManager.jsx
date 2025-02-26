import { useState } from "react";

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  ON_THE_WAY: "bg-blue-100 text-blue-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const initialDeliveries = [
  {
    id: 1,
    client: "Juan Pérez",
    date: "2023-10-01",
    status: "ON_THE_WAY",
    address: "Calle Falsa 123, Ciudad, País",
    trackingNumber: "TRK123456789",
    deliveryMethod: "Envío estándar",
    notes: "Entregar en la puerta principal.",
    amount: 29.99,
    deliveryPerson: "Carlos López",
  },
  {
    id: 2,
    client: "María García",
    date: "2023-10-02",
    status: "DELIVERED",
    address: "Avenida Siempre Viva 742, Ciudad, País",
    trackingNumber: "TRK987654321",
    deliveryMethod: "Envío exprés",
    notes: "Requiere firma al recibir.",
    amount: 49.99,
    deliveryPerson: "Ana Torres",
  },
  {
    id: 3,
    client: "Pedro Martínez",
    date: "2023-10-03",
    status: "PENDING",
    address: "Calle de la Amargura 456, Ciudad, País",
    trackingNumber: "TRK456789123",
    deliveryMethod: "Recogida en tienda",
    notes: "Recoger después de las 5 PM.",
    amount: 15.0,
    deliveryPerson: "Luis Fernández",
  },
  {
    id: 4,
    client: "Laura Sánchez",
    date: "2023-10-04",
    status: "ON_THE_WAY",
    address: "Boulevard de los Sueños 789, Ciudad, País",
    trackingNumber: "TRK321654987",
    deliveryMethod: "Envío internacional",
    notes: "Puede tardar hasta 2 semanas.",
    amount: 99.99,
    deliveryPerson: "Sofía Ruiz",
  },
  {
    id: 5,
    client: "Javier López",
    date: "2023-10-05",
    status: "CANCELLED",
    address: "Calle del Sol 101, Ciudad, País",
    trackingNumber: "TRK654321789",
    deliveryMethod: "Envío rápido",
    notes: "Pedido cancelado por el cliente.",
    amount: 39.99,
    deliveryPerson: "Miguel Ángel",
  },
  {
    id: 6,
    client: "Claudia Romero",
    date: "2023-10-06",
    status: "DELIVERED",
    address: "Calle de la Luna 202, Ciudad, País",
    trackingNumber: "TRK789123456",
    deliveryMethod: "Envío a domicilio",
    notes: "Dejar en el garaje.",
    amount: 59.99,
    deliveryPerson: "Fernando Gómez",
  },
];


export default function DeliveryManager() {
  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const updateStatus = (id, newStatus) => {
    setDeliveries(deliveries.map(d => (d.id === id ? { ...d, status: newStatus } : d)));
  };

  const openModal = (order = null) => {
    setEditingOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Gestión de Entregas</h2>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Nueva Orden
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
  {deliveries.map((delivery) => (
    <div key={delivery.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{delivery.client}</h3>
          <p className="text-sm text-gray-500">{delivery.date}</p>
        </div>
        <span className={`px-3 py-1 text-sm rounded-full ${statusColors[delivery.status]}`}>
          {delivery.status}
        </span>
      </div>

      <div className="flex flex-col space-y-2 mb-4">
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 dark:text-gray-300">Dirección:</span>
          <p className="ml-2 text-gray-600 dark:text-gray-400">{delivery.address}</p>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 dark:text-gray-300">Número de seguimiento:</span>
          <p className="ml-2 text-gray-600 dark:text-gray-400">{delivery.trackingNumber}</p>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 dark:text-gray-300">Método de entrega:</span>
          <p className="ml-2 text-gray-600 dark:text-gray-400">{delivery.deliveryMethod}</p>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 dark:text-gray-300">Notas:</span>
          <p className="ml-2 text-gray-600 dark:text-gray-400">{delivery.notes}</p>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 dark:text-gray-300">Monto:</span>
          <p className="ml-2 text-gray-600 dark:text-gray-400">${delivery.amount}</p>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 dark:text-gray-300">Persona de entrega:</span>
          <p className="ml-2 text-gray-600 dark:text-gray-400">{delivery.deliveryPerson}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <select
          className="bg-gray-200 dark:bg-gray-700 p-2 rounded-md text-sm flex-1 mr-2"
          value={delivery.status}
          onChange={(e) => updateStatus(delivery.id, e.target.value)}
        >
          {Object.keys(statusColors).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <button
          onClick={() => openModal(delivery)}
          className="text-blue-600 dark:text-blue-400 hover:scale-110 transition-transform duration-200"
          aria-label="Editar entrega"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4l4 4-8 8H8v-4l8-8z" />
          </svg>
        </button>
      </div>
    </div>
  ))}
</div>
      {isModalOpen && <OrderModal order={editingOrder} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

function OrderModal({ order, onClose }) {
  const [formData, setFormData] = useState(order || { client: "", date: "", status: "PENDING" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(order ? "Orden actualizada" : "Nueva orden creada");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-80 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300">
          ✖️
        </button>
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">{order ? "Editar Orden" : "Nueva Orden"}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="client"
            value={formData.client}
            onChange={handleChange}
            placeholder="Nombre del cliente"
            required
            className="border p-2 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="border p-2 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            {Object.keys(statusColors).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <div className="flex justify-between mt-3">
            <button type="button" onClick={onClose} className="text-gray-600 dark:text-gray-400">
              Cancelar
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

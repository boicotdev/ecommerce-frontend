import { useState } from "react";


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


const statusColors = {
  PENDING: "bg-amber-50 text-amber-600 border border-amber-200",
  ON_THE_WAY: "bg-sky-50 text-sky-600 border border-sky-200",
  DELIVERED: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  CANCELLED: "bg-rose-50 text-rose-600 border border-rose-200",
};

const statusLabels = {
  PENDING: "Pendiente",
  ON_THE_WAY: "En camino",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

// Mantener initialDeliveries sin cambios...

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
    <div className="container mx-auto p-4 sm:p-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Gestión de Entregas</h2>
          <p className="text-gray-500 text-sm mt-1">Administra y realiza seguimiento de los pedidos</p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Nueva Orden
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {deliveries.map((delivery) => (
          <div key={delivery.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{delivery.client}</h3>
                  <p className="text-sm text-gray-500">{new Date(delivery.date).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[delivery.status]}`}>
                  {statusLabels[delivery.status]}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-600 flex-1">{delivery.address}</p>
                </div>
                
                <div className="flex gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <p className="text-gray-600">{delivery.trackingNumber}</p>
                </div>

                <div className="flex gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-600">{delivery.deliveryMethod}</p>
                </div>

                <div className="flex gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-gray-600">{delivery.deliveryPerson}</p>
                </div>

                {delivery.notes && (
                  <div className="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-gray-600">{delivery.notes}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-600">${delivery.amount.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-4 bg-gray-50 border-t border-gray-100">
              <select
                className="flex-1 text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={delivery.status}
                onChange={(e) => updateStatus(delivery.id, e.target.value)}
              >
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => openModal(delivery)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                aria-label="Editar entrega"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {editingOrder ? "Editar Orden" : "Nueva Orden"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                setIsModalOpen(false);
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cliente
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Nombre del cliente"
                    defaultValue={editingOrder?.client}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de entrega
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    defaultValue={editingOrder?.date}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    defaultValue={editingOrder?.status || "PENDING"}
                  >
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600"
                  >
                    {editingOrder ? "Actualizar" : "Crear"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
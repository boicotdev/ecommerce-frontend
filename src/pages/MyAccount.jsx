import { useState } from 'react';

// Datos de ejemplo
const initialUserData = {
  name: "Juan Pérez",
  email: "juan@example.com",
  phone: "123-456-7890",
  address: "Calle Principal 123, Ciudad"
};

const initialOrders = [
  { id: 1, date: "2023-09-15", total: 99.99, status: "Entregado" },
  { id: 2, date: "2023-09-20", total: 149.99, status: "En proceso" },
  { id: 3, date: "2023-09-25", total: 79.70, status: "Pendiente" },
  { id: 4, date: "2024-09-12", total: 67.99, status: "Cancelado" },
  { id: 5, date: "2024-09-21", total: 120.99, status: "Pendiente" },
];

export default function MyAccount() {
  const [userData, setUserData] = useState(initialUserData);
  const [orders, setOrders] = useState(initialOrders);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Aquí iría la lógica para enviar los datos actualizados al servidor
    console.log("Datos actualizados:", userData);
  };

  const handleCancelOrder = (orderId) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: "Cancelado" } : order
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Mi Perfil</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Información Personal */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Información Personal</h2>
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
                <textarea
                  id="address"
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Guardar
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <p><span className="font-semibold">Nombre:</span> {userData.name}</p>
              <p><span className="font-semibold">Email:</span> {userData.email}</p>
              <p><span className="font-semibold">Teléfono:</span> {userData.phone}</p>
              <p><span className="font-semibold">Dirección:</span> {userData.address}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Editar Información
              </button>
            </div>
          )}
        </div>

        {/* Gestión de Pedidos */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Mis Pedidos</h2>
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="border-b pb-4">
                <p><span className="font-semibold">Pedido #:</span> {order.id}</p>
                <p><span className="font-semibold">Fecha:</span> {order.date}</p>
                <p><span className="font-semibold">Total:</span> ${order.total.toFixed(2)}</p>
                <p className={order.status === "Entregado" ? "text-green-400" : order.status === "Cancelado" ? "text-red-400" : "text-gray-700"}><span className="font-semibold text-gray-900">Estado:</span> {order.status}</p>
                {order.status !== "Entregado" && order.status !== "Cancelado" && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    Cancelar Pedido
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
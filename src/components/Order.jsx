import React from "react";

function Order({ order, handleCancelOrder }) {
  return (
    <div className="border-b pb-4">
      <p>
        <span className="font-semibold">Pedido #:</span> {order.id}
      </p>
      <p>
        <span className="font-semibold">Fecha:</span> {order.creation_date}
      </p>
      <p>
        <span className="font-semibold">Total:</span> ${order.total?.toFixed(2)}
      </p>
      <p
        className={
          order.status === "DELIVERED"
            ? "text-green-400"
            : order.status === "CANCELLED"
            ? "text-red-400"
            : order.status === "PENDING"
            ? "text-blue-400"
            : "text-gray-700"
        }
      >
        <span className="font-semibold text-gray-900">Estado:</span>{" "}
        {order.status}
      </p>
      {order.status !== "DELIVERED" && order.status !== "CANCELLED" && (
        <button
          onClick={() => handleCancelOrder(order.id)}
          className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Cancelar Pedido
        </button>
      )}
    </div>
  );
}

export default Order;

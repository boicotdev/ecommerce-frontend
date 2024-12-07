import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TransactionPage = () => {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({
    id: "TX123456",
    status: "pending",
    date: new Date().toISOString(),
    total: 159.97,
    // products: [
    //   { id: 1, name: "Camiseta", price: 29.99, quantity: 2 },
    //   { id: 2, name: "Pantalón", price: 49.99, quantity: 1 },
    //   { id: 3, name: "Zapatos", price: 79.99, quantity: 1 },
    // ],
    shippingAddress: "Calle Principal 123, Ciudad, País",
    paymentMethod: "Tarjeta de crédito",
  });

  useEffect(() => {
    // Simulación de cambio de estado después de 5 segundos
    const timer = setTimeout(() => {
      setTransaction((prev) => ({ ...prev, status: "completed" }));
      navigate("/account");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "processing":
        return "bg-blue-200 text-blue-800";
      case "completed":
        return "bg-green-200 text-green-800";
      case "failed":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Detalles de la Transacción
                </h2>
                <p className="text-xl">ID: {transaction.id}</p>
                <p className="text-xl">
                  Estado:
                  <span
                    className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      transaction.status
                    )}`}
                  >
                    {transaction.status.toUpperCase()}
                  </span>
                </p>
                <p>Fecha: {new Date(transaction.date).toLocaleString()}</p>
                <p>Total: ${transaction.total.toFixed(2)}</p>
                {/* <div>
                  <h3 className="text-xl font-bold mt-4 mb-2">Productos:</h3>
                  <ul>
                    {transaction.products.map((product) => (
                      <li key={product.id} className="mb-2">
                        {product.name} - ${product.price.toFixed(2)} x{" "}
                        {product.quantity}
                      </li>
                    ))}
                  </ul>
                </div> */}
                <p>Dirección de envío: {transaction.shippingAddress}</p>
                <p>Método de pago: {transaction.paymentMethod}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;

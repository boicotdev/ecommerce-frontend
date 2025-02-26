import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { paymentDetails } from "../api/actions.api";
import { formatPrice, loadState } from "../utils/utils";
import Spinner from "../components/Spinner";
import { useCart } from "../context/CartContext";
const TransactionPage = () => {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({
    id: "TX123456",
    payment_status: "pending",
    payment_date: new Date().toISOString(),
    payment_amount: 159.97,
    shippingAddress: "Calle Principal 123, Ciudad, País",
    payment_method: "Tarjeta de crédito",
  });
  const [loading, setLoading] = useState(true);
  const { order } = useParams();

  useEffect(() => {
    const loadPaymentDetails = async () => {
      try {
        const response = await paymentDetails(order);
        if (response.status === 200) {
          setTransaction(response.data);
          const timer = setTimeout(() => {
            navigate("/account");
          }, 5000);
          localStorage.removeItem("orderID");
          return () => clearTimeout(timer);
        }
      } catch (error) {
        const { data } = error;
        console.error(error);
      } finally {
        setLoading(false);
        localStorage.removeItem("orderID");
      }
    };
    loadPaymentDetails();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toUpperCase()) {
      case "WAITING":
        return "bg-yellow-200 text-yellow-800";
      case "PENDING":
        return "bg-blue-200 text-blue-800";
      case "APPROVED":
        return "bg-green-200 text-green-800";
      case "DECLINED":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return loading ? (
    <Spinner />
  ) : (
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
                      transaction.payment_status
                    )}`}
                  >
                    {transaction.payment_status.toUpperCase()}
                  </span>
                </p>
                <p>
                  Fecha: {new Date(transaction.payment_date).toLocaleString()}
                </p>
                <p>Total: ${formatPrice(transaction.payment_amount)}</p>
                <p>
                  Dirección de envío: {transaction.shippingAddress || "Uknown"}
                </p>
                <p>
                  Método de pago:{" "}
                  {transaction.payment_method.toUpperCase() === "CREDIT_CARD"
                    ? "Tarjeta de credito"
                    : transaction.payment_method === "DEBIT_CARD"
                    ? "Tarjeta debito"
                    : "Efectivo"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;

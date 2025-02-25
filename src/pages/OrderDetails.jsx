"use client";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderDetails } from "../api/actions.api";
import formatDate, { formatPrice } from "../utils/utils";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({});

  useEffect(() => {
    const orderDetails = async () => {
      try {
        const response = await getOrderDetails(id);
        if (response.status === 200) {
          const paymentDetails = response.data.payment;
          setPaymentDetails(paymentDetails);
          setOrder(response.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(true);
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    orderDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!order && !loading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Detalles del pedido
          </h1>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <svg
                className="h-6 w-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <h3 className="text-lg font-medium text-red-800">Error</h3>
                <p className="mt-1 text-red-700">
                  No se ha encontrado una orden con el id: {id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Detalles del pedido
            </h1>
            <StatusBadge status={order.status} />
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Order Header */}
            <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  Orden #{id}
                </h2>
                <p className="text-sm text-gray-500">
                  {formatDate(order.creation_date)}
                </p>
              </div>
            </div>

            {/* Customer Details */}
            <div className="px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <DetailItem
                    label="Cliente"
                    value={`${order.user.first_name} ${order.user.last_name}`}
                  />
                  <DetailItem label="Dirección" value={order.user.address} />
                </div>
                <div className="space-y-4">
                  <DetailItem
                    label="Total"
                    value={`$${formatPrice(order.total.toFixed(0))}`}
                    highlight
                  />
                </div>
              </div>
            </div>

            {/* Payment Details */}
            {paymentDetails && (
              <div className="border-t border-gray-100 px-6 py-6 bg-gray-50/50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Detalles del pago
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DetailItem
                    label="Método de pago"
                    value={paymentDetails.payment_method}
                  />
                  <DetailItem
                    label="Fecha de aprobación"
                    value={formatDate(paymentDetails.payment_date)}
                  />
                  <DetailItem
                    label="Estado del pago"
                    value={paymentDetails.payment_status}
                  />
                  <DetailItem
                    label="Valor pagado"
                    value={`$${formatPrice(paymentDetails.payment_amount)}`}
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="border-t border-gray-100 px-6 py-4">
              <div className="flex justify-end gap-3">
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-150">
                  <svg
                    className="h-4 w-4 mr-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Editar
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150">
                  <svg
                    className="h-4 w-4 mr-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Eliminar
                </button>
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-150"
            >
              <svg
                className="w-5 h-5 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Volver al dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value, highlight = false }) {
  return (
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd
        className={`mt-1 text-lg ${
          highlight ? "font-semibold text-gray-900" : "text-gray-700"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function StatusBadge({ status }) {
  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancell":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyles(
        status
      )}`}
    >
      {status}
    </span>
  );
}

export default OrderDetails;

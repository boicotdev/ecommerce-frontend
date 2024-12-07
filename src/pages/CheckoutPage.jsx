import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import { useCart } from "../context/CartContext";
import { formatPrice, loadState } from "../utils/utils";
import { createOrder, createPaymentPreference } from "../api/actions.api";

const MP_ACCESS_KEY = import.meta.env.VITE_APP_MERCADO_PAGO_PUBLIC_KEY;
initMercadoPago(MP_ACCESS_KEY); // Inicializamos mercado pago

export default function CheckoutPage() {
  const back_urls = {
    success: "/payments/succes/",
    failure: "/payments/failure/",
    pending: "/payments/pending/",
  };
  const { orders, setOrders, setItems } = useCart();
  const [preferenceId, setPreferenceId] = useState(null);
  const delivery = 5000;
  const totalPrice =
    orders && orders.length > 0
      ? orders.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)
      : 0;
  const totalPriceWithDelivery = totalPrice + delivery;
  const navigate = useNavigate();

  useEffect(() => {
    const items = loadState("orders");
    if (items.length > 0) {
      setOrders(items);
    }
  }, []);

  const initialization = {
    amount: totalPriceWithDelivery,
    preferenceId,
  };

  const customization = {
    paymentMethods: {
      ticket: "all",
      bankTransfer: "all",
      creditCard: "all",
      debitCard: "all",
      mercadoPago: "all",
    },
  };
  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
    // callback llamado al hacer clic en el botón enviar datos
    return new Promise((resolve, reject) => {
      fetch("http://127.0.0.1:8000/api/v1/process_payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response) => {
          const status = response.status;
          if (status === "approved") {
            // const url = response.data.sandbox_redirect_url;
            const {
              date_approved,
              date_created,
              authorization_code,
              transaction_details,
              items,
            } = response;
            createNewOrder();
          } else {
            // window.location.href = response.data.sandbox_redirect_url;
            console.log(response);
          }
          resolve();
        })
        .catch((error) => {
          // manejar la respuesta de error al intentar crear el pago
          console.error(error);
          reject();
        });
    });
  };
  const onError = async (error) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
  };
  const onReady = async () => {
    /*
    Callback llamado cuando el Brick está listo.
    Aquí puede ocultar cargamentos de su sitio, por ejemplo.
  */
  };
  const createNewOrder = async () => {
    try {
      const { id } = loadState("user");
      const response = await createOrder({
        user: id,
        status: "PENDING",
      });
      if (response.status === 201) {
        // Borrar el carrito de compras
        localStorage.removeItem("orders");
        setOrders([]);
        setItems([]);
        setPreferenceId(null);
        // Redireccionar al sitio de éxito
        navigate(back_urls["success"]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const paymentPreference = async () => {
    try {
      const items = orders.map((item) => {
        return {
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
        };
      });

      const response = await createPaymentPreference({ items });
      if (response.status === 201) {
        setPreferenceId(response.data.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreatePrefenceId = (e) => {
    e.preventDefault();
    paymentPreference();
  };

  return (
    <div className="bg-gray-100 min-h-screen mt-8">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Resumen del pedido y pago */}
          <div>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              {orders && orders.length > 0 ? (
                <>
                  <h2 className="text-2xl font-semibold mb-6">
                    Resumen del pedido
                  </h2>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.sku}>
                        <div className="flex justify-between">
                          <span>Producto {order.name}</span>
                          <span>Cantidad {order.quantity}</span>
                          <span>
                            ${formatPrice(order.price * order.quantity)}
                          </span>
                        </div>
                        <hr />
                      </div>
                    ))}
                    <div className="flex justify-between">
                      <span>Subtotal Productos</span>
                      <span>${formatPrice(getTotalCheck(orders))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Envío</span>
                      <span>${formatPrice(delivery.toString())}</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>
                          ${formatPrice(totalPriceWithDelivery.toString())}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <span className="text-gray-700">Tu carrito está vacio.</span>
                  <Link
                    className="my-0 mx-auto text-center shadow-md rounded-lg px-6 py-3 bg-green-400 hover:bg-green-500 text-white text-2xl"
                    to="/shop"
                  >
                    Ir a comprar <i className="fa fa-shopping-cart"></i>
                  </Link>
                </div>
              )}
            </div>
            {orders && orders.length > 0 && (
              <form onSubmit={handleCreatePrefenceId}>
                {!preferenceId && (
                  <div className="mt-8">
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Realizar pedido
                    </button>
                  </div>
                )}
              </form>
            )}
          </div>
          {/* Formulario de envío */}
          {preferenceId && (
            <Payment
              initialization={initialization}
              customization={customization}
              onSubmit={onSubmit}
              onReady={onReady}
              onError={onError}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function getTotalCheck(items) {
  const total = items.reduce(
    (accum, item) => accum + item.quantity * item.price,
    0
  );
  return total;
}

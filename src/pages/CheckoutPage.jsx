import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import { useCart } from "../context/CartContext";
import { formatPrice, saveState, loadState } from "../utils/utils";
import { createPaymentPreference } from "../api/actions.api";
import CouponForm from "../components/CouponForm";
import { checkOrderItemsChanged, createPayment } from "../api/payments.api";
import { apiImageURL } from "../api/baseUrls";

const MP_ACCESS_KEY = import.meta.env.VITE_APP_MERCADO_PAGO_PUBLIC_KEY;
initMercadoPago(MP_ACCESS_KEY); // Inicializamos mercado pago

export default function CheckoutPage() {
  const back_urls = {
    success: `/payments/success`,
    failure: `/payments/failure`,
    pending: `/payments/pending`,
  };
  const delivery = 5000;
  const { orders, setOrders, setItems, couponIsValid, setCouponIsValid } =
    useCart();
  const [preferenceId, setPreferenceId] = useState(null);
  const totalPrice =
    orders && orders.length > 0
      ? orders.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)
      : 0;
  const totalPriceWithDelivery = totalPrice + delivery;
  const [initialization, setInitialization] = useState({
    amount: totalPriceWithDelivery,
    preferenceId: null,
  });
  const navigate = useNavigate();

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
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))["access"]
          }`,
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
              transaction_details,
              payment_method,
              status,
            } = response;
            const { type: paymentMethod } = payment_method;
            const { total_paid_amount } = transaction_details;
            let orderId = loadState("orderID");
            setOrders([]);
            setItems([]);
            setPreferenceId(null);
            processPayment(
              orderId,
              date_approved,
              total_paid_amount,
              paymentMethod.toUpperCase(),
              status.toUpperCase()
            );

            // Eliminar el carrito de la sesión
            localStorage.removeItem("orders");
            localStorage.removeItem("cartIsSaved");
            localStorage.removeItem("CartID");
            saveState("preferenceCreated", false);
            let id = JSON.parse(localStorage.getItem("ordeID"));
            navigate(`${back_urls["success"]}/${id}`); // Redireccionar al sitio de éxito
          } else {
            window.location.href = response.data.sandbox_redirect_url;
            console.log(response);
          }
          resolve();
        })
        .catch((error) => {
          // manejar la respuesta de error al intentar crear el pago
          const { response } = error;
          console.error(response);
          reject();
        });
    });
  };
  const onError = async (error) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
  };
  const onReady = async () => {
    //Callback llamado cuando el Brick está listo.
  };
  const processPayment = async (
    orderID,
    paymentDate,
    totalAmount,
    paymentMethod,
    paymentStatus
  ) => {
    try {
      const response = await createPayment({
        order_id: orderID,
        payment_date: paymentDate,
        payment_amount: totalAmount,
        payment_method: paymentMethod,
        payment_status: paymentStatus,
      });
      if (response.status === 201) {
        // Borrar el carrito de compras
        saveState("paymentID", response.data.id);
        saveState("preferenceCreated", false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreatePreferenceId = async (e) => {
    e.preventDefault();
    saveState("preferenceCreated", true);

    try {
      const savedPreference = loadState("preferenceCreated");

      // Validar que la preferencia guardada es un JSON válido
      const preferenceCreated = savedPreference
        ? JSON.parse(savedPreference)
        : false;

      const orderItems = orders.map((item) => {
        return {
          sku: item.sku,
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
        };
      });
      // saveState('preferenceCreated', true)

      if (preferenceCreated) {
        const { id } = loadState("user");
        const CartID = loadState("CartID");
        const orderItemsHasChanged = await checkOrderItemsChanged(
          orders,
          id,
          CartID
        );

        if (orderItemsHasChanged) {
          const response = await createPaymentPreference({ items: orderItems });
          if (response.status === 201 || response.status === 200) {
            setPreferenceId(response.data.preference_data.id);
            saveState("preferenceCreated", true);
            saveState("orderID", response.data.order);
          }
        }
        return;
      } else {
        // Si no hay preferencia creada, generar una nueva
        const response = await createPaymentPreference({ items: orderItems });
        if (response.status === 201) {
          setPreferenceId(response.data.preference_data.id);
          saveState("preferenceCreated", true);
          saveState("orderID", response.data.order);
        }
      }
    } catch (error) {
      console.error("Error al manejar la preferencia de pago:", error);
    }
  };

  useEffect(() => {
    // Cargar el carrito de compras del local storage
    const orders = loadState("orders");
    setOrders(orders);
    setInitialization({
      ...initialization,
      amount: getTotalCheck(orders) + delivery,
    });
  }, []);

  const applyDiscount = (discount, type) => {
    const orders = loadState("orders");
    const total = getTotalCheck(orders) + delivery;
    let discountPrice = 0;

    switch (type) {
      case "FIXED":
        discountPrice = discount;
        break;
      case "PERCENTAGE":
        discountPrice = total - (total / 100) * discount;
        break;
      default:
        console.warn("Tipo de descuento desconocido");
        break;
    }
    setCouponIsValid(true);
    const discountedTotal = discountPrice;
    setInitialization({
      amount: Math.floor(discountedTotal),
      preferenceId,
    });
    return {
      total,
      discounted: discountedTotal,
      totalCheck: Math.ceil(discountPrice),
    };
  };
  return (
    <div className="min-h-screen bg-gray-50/50 py-12 mt-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Finalizar compra
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Revisa tu pedido y completa el pago
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Resumen del pedido */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  Resumen del pedido
                </h2>

                {orders && orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.sku}
                        className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            <div className="h-16 w-16 rounded-lg bg-gray-100">
                              <img
                                className="h-full w-full object-cover rounded-lg"
                                src={`${apiImageURL}${order.main_image}`}
                                alt={order.name}
                              />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">
                              {order.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Cantidad: {order.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          ${formatPrice(order.price * order.quantity)}
                        </p>
                      </div>
                    ))}

                    <div className="pt-4 space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Subtotal</span>
                        <span className="text-sm font-medium text-gray-900">
                          ${formatPrice(getTotalCheck(orders))}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Envío</span>
                        <span className="text-sm font-medium text-gray-900">
                          ${formatPrice(delivery.toString())}
                        </span>
                      </div>

                      {couponIsValid && (
                        <>
                          <div className="flex justify-between text-emerald-600">
                            <span className="text-sm">Descuento aplicado</span>
                            <span className="text-sm font-medium">
                              -$
                              {formatPrice(
                                (
                                  totalPriceWithDelivery - initialization.amount
                                ).toString()
                              )}
                            </span>
                          </div>
                        </>
                      )}

                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex justify-between">
                          <span className="text-base font-medium text-gray-900">
                            Total
                          </span>
                          <span className="text-base font-medium text-gray-900">
                            $
                            {formatPrice(
                              couponIsValid
                                ? initialization.amount.toString()
                                : totalPriceWithDelivery.toString()
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      Carrito vacío
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      No hay productos en tu carrito
                    </p>
                    <div className="mt-6">
                      <Link
                        to="/shop"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        Ir a comprar
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {!preferenceId && orders && orders.length > 0 && (
              <CouponForm applyDiscount={applyDiscount} />
            )}

            {orders && orders.length > 0 && !preferenceId && (
              <form onSubmit={handleCreatePreferenceId}>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  Continuar al pago
                </button>
              </form>
            )}
          </div>

          {/* Formulario de pago */}
          {preferenceId && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  Método de pago
                </h2>
                <Payment
                  initialization={initialization}
                  customization={customization}
                  onSubmit={onSubmit}
                  onReady={onReady}
                  onError={onError}
                />
              </div>
            </div>
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

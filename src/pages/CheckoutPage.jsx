import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import { useCart } from "../context/CartContext";
import { formatPrice, saveState, loadState } from "../utils/utils";
import { createPaymentPreference } from "../api/actions.api";
import CouponForm from "../components/CouponForm";
import { createPayment } from "../api/payments.api";

const MP_ACCESS_KEY = import.meta.env.VITE_APP_MERCADO_PAGO_PUBLIC_KEY;
initMercadoPago(MP_ACCESS_KEY); // Inicializamos mercado pago

export default function CheckoutPage() {
  const [orderID, setOrderID] = useState("");
  const back_urls = {
    success: `/payments/succes/${orderID}`,
    failure: `/payments/failure/${orderID}`,
    pending: `/payments/pending/${orderID}`,
  };
  const { orders, setOrders, setItems, couponIsValid, setCouponIsValid } =
    useCart();
  const [preferenceId, setPreferenceId] = useState(null);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const delivery = 5000;
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

            setOrderID(loadState("orderID"));
            setOrders([]);
            setItems([]);
            setPreferenceId(null);
            processPayment(
              orderID,
              date_approved,
              total_paid_amount,
              paymentMethod.toUpperCase(),
              status.toUpperCase()
            );

            // Eliminar el carrito de la sesión
            localStorage.removeItem("orders");
            localStorage.removeItem("cartIsSaved");
            localStorage.removeItem("CartID");
            navigate(back_urls["success"]); // Redireccionar al sitio de éxito
          } else {
            window.location.href = response.data.sandbox_redirect_url;
            console.log(response);
          }
          resolve();
        })
        .catch((error) => {
          // manejar la respuesta de error al intentar crear el pago
          const { response } = error;
          console.error(response.data);
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  const paymentPreference = async () => {
    try {
      const items = orders.map((item) => {
        return {
          sku: item.sku,
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
        };
      });

      const response = await createPaymentPreference({ items });
      if (response.status === 201) {
        setPreferenceId(response.data.preference_data.id);
        const orderID = response.data.order;
        setOrderID(orderID);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreatePrefenceId = (e) => {
    e.preventDefault();
    paymentPreference();
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
                    {orders &&
                      orders.length > 0 &&
                      orders.map((order) => (
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

                    {couponIsValid ? (
                      <>
                        <div className="border-t pt-4">
                          <div className="flex justify-between font-semibold">
                            <span>Total antes del descuento</span>
                            <span>
                              ${formatPrice(totalPriceWithDelivery.toString())}
                            </span>
                          </div>
                        </div>
                        <div className="border-t pt-4">
                          <div className="flex justify-between font-semibold">
                            <span>Descuento</span>
                            <span>
                              $
                              {formatPrice(
                                (
                                  totalPriceWithDelivery - initialization.amount
                                ).toString()
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="border-t pt-4">
                          <div className="flex justify-between font-semibold">
                            <span>Total a pagar</span>
                            <span>
                              ${formatPrice(initialization.amount.toString())}
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="border-t pt-4">
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>
                            ${formatPrice(totalPriceWithDelivery.toString())}
                          </span>
                        </div>
                      </div>
                    )}
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
            {!preferenceId && <CouponForm applyDiscount={applyDiscount} />}
            {orders && orders.length > 0 && (
              <form onSubmit={handleCreatePrefenceId}>
                {!preferenceId && (
                  <div className="mt-8">
                    <div>
                      <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Realizar pedido
                      </button>
                    </div>
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

import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { formatPrice, loadState } from "../utils/utils";
import { useEffect } from "react";

export default function CheckoutPage() {
  const { orders, setOrders } = useCart();
  const delivery = 5000;
  const totalPrice =
    orders && orders.length > 0
      ? orders.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)
      : 0;
  const totalPriceWithDelivery = totalPrice + delivery;

  useEffect(() => {
    const items = loadState("orders");
    if (items.length > 0) {
      setOrders(items);
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen mt-8">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulario de envío */}
          {orders && orders.length > 0 && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">
                Información de envío
              </h2>
              <form>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Dirección
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Ciudad
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="postalCode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Código postal
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

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
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-6">Método de pago</h2>
                <form>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="cardNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Número de tarjeta
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="expirationDate"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Fecha de expiración
                        </label>
                        <input
                          type="text"
                          id="expirationDate"
                          name="expirationDate"
                          placeholder="MM / YY"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="cvv"
                          className="block text-sm font-medium text-gray-700"
                        >
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
        {orders && orders.length > 0 && (
          <div className="mt-8">
            <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Realizar pedido
            </button>
          </div>
        )}
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

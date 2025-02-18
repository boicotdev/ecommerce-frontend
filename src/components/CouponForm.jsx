import { useState } from "react";
import { validateCoupon } from "../api/actions.api";
import { useCart } from "../context/CartContext";

export default function CouponForm({ applyDiscount }) {
  const [showForm, setShowForm] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState(null);
  const { setCouponIsValid } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (couponCode.trim() === "") {
        setError("El código de cupón no puede estar vacío");
        return;
      }
      const response = await validateCoupon(
        couponCode.trim().toLocaleUpperCase()
      );
      // Here we can check if the coupon exists and is valid
      if (response.status === 200) {
        const { discount, type } = response.data;
        handleApplyCoupon(discount, type);
        setCouponIsValid(true);
      }
    } catch (error) {
      const { response } = error;
      if (response && response.status === 400) {
        setError(response.data.error);
        setCouponIsValid(false);
        return;
      }
      setError(response.data.message);
      setCouponIsValid(false);
      return;
    }

    // Reset the form
    setCouponCode("");
    setShowForm(false);
  };

  const handleReset = () => {
    setCouponCode("");
    setShowForm(false);
    setError(null);
  };

  const handleApplyCoupon = (discount, type) => {
    setError(null);
    applyDiscount(discount, type);
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md lg:mb-4">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
        >
          Tengo un cupón
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="coupon"
              className="block text-sm font-medium text-gray-700"
            >
              Código de cupón
            </label>
            <input
              type="text"
              id="coupon"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Ingrese su código de cupón"
              required
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors duration-200"
            >
              Validar
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 py-2 px-4 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-colors duration-200"
            >
              Cancelar
            </button>
          </div>
          {error && <div className="text-red-500 text-xs">{error}</div>}
        </form>
      )}
    </div>
  );
}

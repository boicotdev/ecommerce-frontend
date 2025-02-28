import { useState } from "react";
import { validateCoupon } from "../api/actions.api";
import { useCart } from "../context/CartContext";

export default function CouponForm({ applyDiscount }) {
  const [showForm, setShowForm] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setCouponIsValid } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (couponCode.trim() === "") {
        setError("El código de cupón no puede estar vacío");
        return;
      }
      const response = await validateCoupon(couponCode.trim().toLocaleUpperCase());
      
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
    } finally {
      setLoading(false);
    }

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
    <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          Tengo un cupón de descuento
        </button>
      ) : (
        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="coupon"
                className="block text-sm font-medium text-gray-700"
              >
                Código de cupón
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="coupon"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  placeholder="Ingrese su código de cupón"
                  required
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Validando...
                  </>
                ) : (
                  'Validar'
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
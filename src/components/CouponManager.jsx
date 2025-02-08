import { useEffect, useState } from "react";
import { getCoupons } from "../api/actions.api";

export default function CouponManager() {
  const [coupons, setCoupons] = useState([]);
  const [filter, setFilter] = useState("");
  const [editingCoupon, setEditingCoupon] = useState(null);

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(filter.toLowerCase())
  );

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
  };

  const handleDelete = (id) => {
    setCoupons(coupons.filter((coupon) => coupon.id !== id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setCoupons(
      coupons.map((coupon) =>
        coupon.id === editingCoupon.id ? editingCoupon : coupon
      )
    );
    setEditingCoupon(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingCoupon({ ...editingCoupon, [name]: value });
  };

  useEffect(() => {
    // localStorage.setItem("coupons", JSON.stringify(coupons));
    const retrieveCoupons = async () => {
      try {
        const response = await getCoupons();
        if (response.status === 200) {
          const coupons = response.data;
          const customCoupons = coupons.map((coupon) => {
            return {
              code: coupon.coupon_code,
              expirationDate: coupon.expiration_date,
              type:
                coupon.discount_type === "PERCENTAGE" ? "Porcentaje" : "Fijo",
            };
          });
          setCoupons(customCoupons);
        }
      } catch (error) {
        const { message } = error;
        throw new Error(message);
      }
    };
    retrieveCoupons();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {/* Filtro */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filtrar cupones..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Lista de cupones */}
      <div className="space-y-4">
        {filteredCoupons.map((coupon) => (
          <div
            key={coupon.code}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-md"
          >
            <div>
              <h3 className="font-bold">{coupon.code}</h3>
              <p>
                Descuento: {coupon.discount}
                {coupon.type === "percentage" ? "%" : " COP"}
              </p>
              <p>Expira: {coupon.expirationDate}</p>
            </div>
            <div>
              <button
                onClick={() => handleEdit(coupon)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(coupon.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de edición */}
      {editingCoupon && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">Editar Cupón</h3>
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Código
                </label>
                <input
                  type="text"
                  name="code"
                  value={editingCoupon.code}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Descuento
                </label>
                <input
                  type="number"
                  name="discount"
                  value={editingCoupon.discount}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Fecha de Expiración
                </label>
                <input
                  type="date"
                  name="expirationDate"
                  value={editingCoupon.expirationDate}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Tipo
                </label>
                <select
                  name="type"
                  value={editingCoupon.type}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="percentage">Porcentaje</option>
                  <option value="fixed">Monto Fijo</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditingCoupon(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

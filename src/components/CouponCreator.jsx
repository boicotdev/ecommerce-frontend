import { useState } from "react";
import { createCoupon } from "../api/actions.api";
import toast from "react-hot-toast";
import { formatDateStyled } from "../utils/utils";
import { useNavigate } from "react-router-dom";

export default function CouponCreator() {
  const [coupon, setCoupon] = useState({
    code: "",
    discount: 0,
    expirationDate: "",
    type: "PERCENTAGE",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupon((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // check the current data
      if (
        coupon.code.trim() === "" ||
        coupon.discount <= 0 ||
        coupon.expirationDate.trim() === ""
      ) {
        throw new Error("Todos los campos son obligatorios");
      }
      // check the expiration date
      const today = new Date();
      const expirationDate = new Date(coupon.expirationDate);
      if (today > expirationDate) {
        toast.error("Expiration date must be in the future");
        throw new Error("Expiration date must be in the future");
      }
      const couponData = {
        ...coupon,
        coupon_code: coupon.code.toUpperCase(),
        expiration_date: formatDateStyled(coupon.expirationDate),
        discount_type: coupon.type === "PERCENTAGE" ? "PERCENTAGE" : "FIXED",
      };
      const response = await createCoupon(couponData);
      if (response.status === 201) {
        // Reset the form
        setCoupon({
          code: "",
          discount: 0,
          expirationDate: "",
          type: "PERCENTAGE",
        });
        toast.success("Cupón creado exitosamente");
        navigate("/coupons");
      }
    } catch (error) {
      const { message } = error;
      throw new Error(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
      >
        <div>
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-700"
          >
            Código del Cupón
          </label>
          <input
            id="code"
            name="code"
            type="text"
            value={coupon.code}
            onChange={handleChange}
            placeholder="Ej: SUMMER2023"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="discount"
            className="block text-sm font-medium text-gray-700"
          >
            Descuento
          </label>
          <input
            id="discount"
            name="discount"
            type="number"
            value={coupon.discount}
            onChange={handleChange}
            min={0}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="expirationDate"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha de Expiración
          </label>
          <input
            id="expirationDate"
            name="expirationDate"
            type="date"
            value={coupon.expirationDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Tipo de Descuento
          </label>
          <select
            id="type"
            name="type"
            value={coupon.type}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="percentage">Porcentaje</option>
            <option value="fixed">Monto Fijo</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Crear Cupón
        </button>
      </form>
    </>
  );
}

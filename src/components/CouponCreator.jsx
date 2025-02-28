import { createCoupon } from "../api/actions.api";
import { useShop } from "../context/ShopContext";
import FormCreator from "./FormCreator";

export default function CouponCreator() {
  const { setCoupons } = useShop();

  const initialState = {
    code: "",
    discount: 0,
    expirationDate: "",
    type: "PERCENTAGE",
  };

  const fields = [
    { label: "Código del Cupón", name: "code", type: "text", placeholder: "Ej: SUMMER2023" },
    { label: "Descuento", name: "discount", type: "number", placeholder: "Ej: 20" },
    { label: "Fecha de Expiración", name: "expirationDate", type: "date" },
    {
      label: "Tipo de Descuento",
      name: "type",
      type: "select",
      options: [
        { value: "PERCENTAGE", label: "Porcentaje" },
        { value: "FIXED", label: "Monto Fijo" },
      ],
    },
  ];

  const submitAction = async (formData) => {
    const today = new Date();
    const expirationDate = new Date(formData.expirationDate);
    if (today > expirationDate) {
      throw new Error("Expiration date must be in the future");
    }

    const couponData = {
      ...formData,
      coupon_code: formData.code.toUpperCase(),
      discount_type: formData.type,
    };

    const response = await createCoupon(couponData);
    setCoupons((prev) => [...prev, response.data]);
  };

  return <FormCreator initialState={initialState} fields={fields} submitAction={submitAction} successMessage="Cupón creado exitosamente" />;
}

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCoupons, removeCoupon, updateCoupon } from "../api/actions.api";
import { useShop } from "../context/ShopContext";
import ItemManager from "./ItemManager";

export default function CouponManager() {
  const { coupons, setCoupons } = useShop();
  const [filter, setFilter] = useState("");
  const [editingCoupon, setEditingCoupon] = useState(null);

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(filter.toLowerCase())
  );

  const handleEdit = (coupon) => {
    console.log(coupon);
    setEditingCoupon(coupon);
  };

  const handleDelete = async (code) => {
    try {
      const response = await removeCoupon(code);
      if (response.status === 204) {
        setCoupons(coupons.filter((coupon) => coupon.code !== code));
        setEditingCoupon(null);
        setFilter("");
        toast.success(`Coupon ${code} was successfully deleted`);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // const handleSave = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const servData = {
  //       coupon_id: editingCoupon.id,
  //       coupon_code: editingCoupon.code,
  //       discount: editingCoupon.discount,
  //       expiration_date: editingCoupon.expirationDate,
  //       discount_type: editingCoupon.type,
  //     };
  //     const response = await updateCoupon(servData);
  //     if (response.status === 200) {
  //       const {
  //         id,
  //         expiration_date: expirationDate,
  //         coupon_code: code,
  //         discount,
  //         discount_type,
  //       } = response.data;

  //       const updateCoupon = {
  //         id,
  //         expirationDate,
  //         discount,
  //         code,
  //         type: discount_type === "PERCENTAGE" ? "PERCENTAGE" : "FIXED",
  //       };

  //       setCoupons((prevCoupons) => {
  //         return prevCoupons.map((coupon) =>
  //           coupon.id === updateCoupon.id ? updateCoupon : coupon
  //         );
  //       });
  //       console.log(updateCoupon);

  //       setEditingCoupon(null);
  //     }
  //   } catch (error) {
  //     console.error("Error al actualizar el cupón:", error);
  //   }
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditingCoupon({ ...editingCoupon, [name]: value });
  // };

  useEffect(() => {
    // localStorage.setItem("coupons", JSON.stringify(coupons));
    const retrieveCoupons = async () => {
      try {
        const response = await getCoupons();
        if (response.status === 200) {
          const coupons = response.data;
          const customCoupons = coupons.map((coupon) => {
            return {
              id: coupon.id,
              code: coupon.coupon_code,
              expirationDate: coupon.expiration_date,
              type:
                coupon.discount_type === "PERCENTAGE" ? "PERCENTAGE" : "FIXED",
              discount: coupon.discount,
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

  const columns = [
    { key: "code", label: "Código" },
    { key: "discount", label: "Descuento" },
    { key: "expirationDate", label: "Expiración" },
    { key: "type", label: "Tipo" },
  ];

  return (
    <ItemManager
      title="Gestión de Cupones"
      items={coupons}
      columns={columns}
      deleteAction={handleDelete}
      editAction={handleEdit}
    />
  );
}

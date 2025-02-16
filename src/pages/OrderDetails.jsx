import  { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderDetails } from "../api/actions.api";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "../utils/utils";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const address = localStorage.getItem('address');


  useEffect(() => {
    const orderDetails = async () => {
      try {
        const response = await getOrderDetails(id);
        if (response.status === 200) {
          setOrder(response.data);
          console.log(response.data)
          setLoading(false);
        }
      } catch (error) {
        setLoading(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    orderDetails();
    // console.log(user)
  }, []);



  if (!order && !loading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-2xl font-bold text-slate-700 mb-4">
          Detalles del pedido
        </h1>
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>No se ha encontrado una orden con el id: {id}</p>
        </div>
      </div>
    );
  } else if(loading) {
    return <Spinner />
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-2xl font-bold text-slate-700 mb-4">
        Detalles del pedido
      </h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Orden #{id}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Cliente</p>
              <p className="text-lg text-gray-800">{`${order.user.first_name}  ${order.user.last_name}`}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Dirección</p>
              <p className="text-lg text-gray-800">{order.user.address}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Fecha</p>
              <p className="text-lg text-gray-800">{order.creation_date}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Estado</p>
              <p
                className={`text-lg font-semibold ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total</p>
              <p className="text-lg font-bold text-gray-800">
                {`$${formatPrice(order.total.toFixed(0))}`} 
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4">
          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-colors">
              Editar <i className="uil uil-pen ml-1"></i>
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors">
              Eliminar <i className="uil uil-trash ml-1"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2 items-center mt-2">
        <Link className="text-indigo-500 hover:text-indigo-600 text-sm" to="/dashboard">
          <i className="fa fa-arrow-left"></i> Volver
        </Link>
        
      </div>
    </div>
  );
}

function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case "delivered":
      return "text-green-600";
    case "pending":
      return "text-yellow-600";
    case "cancell":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
}

export default OrderDetails;

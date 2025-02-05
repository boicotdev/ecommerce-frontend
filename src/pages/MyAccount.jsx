import { useEffect, useState } from "react";
import {
  fetchUserInfo,
  updateUserInfo,
  retrieveUserOrderList,
  orderCancell,
  getUserTestimonials,
  deleteUserTestimonial,
} from "../api/actions.api";
import { loadState, validateData } from "../utils/utils";
import { apiImageURL } from "../api/baseUrls";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function MyAccount() {
  const [userData, setUserData] = useState({});
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [userTestimonials, setUserTestimonials] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    validateData(userData);
    handleEdit();
  };

  const handleEdit = async () => {
    setIsEditing(true);
    try {
      const { avatar, ...data } = userData;
      const response = await updateUserInfo(data);
      if (response.status === 200) {
        toast.success("Información actualizada exitosamente");
        setUserData(response.data);
        setIsEditing(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al actualizar la información");
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const data = { user: userData.id, order: orderId, status: "CANCELLED" };
      const response = await orderCancell(data);
      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: "CANCELLED" } : order
          )
        );
        toast.success("Orden cancelada");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al cancelar la orden");
    }
  };

  const handleDeleteTestimonial = async (testimonialId) => {
    if (confirm("Está seguro que desea eliminar el testimonio")) {
      try {
        const { id } = loadState("user");
        const response = await deleteUserTestimonial({
          user: id,
          testimonial: testimonialId,
        });
        if (response.status === 204) {
          toast.success("Comentario eliminado exitosamente");

          setUserTestimonials((prevTestimonials) =>
            prevTestimonials.filter(
              (testimonial) => testimonial.id !== testimonialId
            )
          );
        }
      } catch (error) {
        console.error(error);
        toast.error("Hubo un error al eliminar el comentario");
      }
    }
  };

  const retrieveOrders = async (id) => {
    try {
      const response = await retrieveUserOrderList(id);
      if (response.status === 200) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const userCommentsRetrieve = async () => {
    try {
      const { id } = loadState("user");
      const response = await getUserTestimonials(id);
      if (response.status === 200) {
        setUserTestimonials(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const { id } = loadState("user");
        const response = await fetchUserInfo(id);
        if (response.status === 200) {
          setUserData(response.data);
          retrieveOrders(response.data.id);
          localStorage.setItem("address", response.data.address);
        }
      } catch (error) {
        console.error(error);
      }
    };
    userCommentsRetrieve();
    loadUserInfo();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Mi Perfil
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Información Personal */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Información Personal
          </h2>
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombres
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={userData.first_name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apellidos
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={userData.last_name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
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
                  value={userData.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {userData && userData.is_superuser && (
                <div>
                  <label
                    htmlFor="rol"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rol
                  </label>
                  <select
                    name="rol"
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Seleccione un rol</option>
                    <option value="Administrador">Administrador</option>{" "}
                    <option value="Vendedor">Vendedor</option>
                    <option value="Cliente">Cliente</option>
                  </select>
                </div>
              )}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <p>
                <span className="font-semibold">Avatar: </span>
                Foto de perfíl
              </p>
              <img
                src={`${apiImageURL}${userData.avatar}`}
                alt={userData.username}
                width={200}
                height={200}
                className="rounded-sm object-cover shadow-md"
              />
              {userData &&
                Object.keys(userData).map(
                  (key) =>
                    key !== "avatar" && ( // Omitir la clave "avatar"
                      <div key={key}>
                        <p>
                          <span className="font-semibold">
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                          </span>
                          {/* Verificar si el valor es booleano y mostrar 'Sí' o 'No' */}
                          {typeof userData[key] === "boolean"
                            ? userData[key]
                              ? "Sí"
                              : "No"
                            : "  " + userData[key]}
                        </p>
                      </div>
                    )
                )}

              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Editar Información
              </button>
            </div>
          )}
        </div>

        {/* Gestión de Pedidos */}
        {orders && userData && !userData.is_superuser && (
          <>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                Mis Pedidos
              </h2>
              <div className="space-y-4">
                {/* Mostrar los pedidos */}
                {orders.length === 0 ? (
                  <p className="text-lg font-semibold mb-4 text-gray-700">
                    No hay pedidos registrados.
                  </p>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="border-b pb-4">
                      <Link className="text-blue-400 hover:text-blue-500" to={`/orders/details/order/${order.id}`}>
                        <span className="font-semibold">Pedido #:</span>{" "}
                        {order.id}
                      </Link>
                      <p>
                        <span className="font-semibold">Fecha:</span>{" "}
                        {order.creation_date}
                      </p>
                      <p>
                        <span className="font-semibold">Total:</span> $
                        {/*order.total.toFixed(2)*/}
                      </p>
                      <p
                        className={
                          order.status === "DELIVERED"
                            ? "text-green-400"
                            : order.status === "CANCELLED"
                            ? "text-red-400"
                            : order.status === "PENDING"
                            ? "text-blue-400"
                            : "text-gray-700"
                        }
                      >
                        <span className="font-semibold text-gray-900">
                          Estado:
                        </span>{" "}
                        {order.status}
                      </p>
                      {order.status !== "DELIVERED" &&
                        order.status !== "CANCELLED" && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                          >
                            Cancelar Pedido
                          </button>
                        )}
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                Mis Comentarios
              </h2>
              <div className="space-y-4">
                {/* Mostrar los comentarios del usuario */}
                {userTestimonials && userTestimonials.length > 0 ? (
                  userTestimonials.map((testimonial) => (
                    <div key={testimonial.id} className="border-b pb-4">
                      <p>
                        <span className="font-semibold">Comentario #:</span>{" "}
                        {testimonial.id}
                      </p>
                      <p>
                        <span className="font-semibold">Fecha:</span>{" "}
                        {testimonial.pub_date}
                      </p>
                      <p>
                        <span className="font-semibold">Comentario:</span>{" "}
                        {testimonial.raw_comment}
                      </p>
                      <button
                        // onClick={() => handleDeleteTestimonial(testimonial.id)}
                        className="mt-2 mr-2 px-3 py-1 bg-orange-500 text-white text-sm rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(testimonial.id)}
                        className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                      >
                        Eliminar
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-lg font-semibold mb-4 text-gray-700">
                    No hay comentarios registrados.
                  </p>
                )}

                <Link
                  to="/testimonials/create/"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 w-fit focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Crear un comentario
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

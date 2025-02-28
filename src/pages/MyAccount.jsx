"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import {
  fetchUserInfo,
  updateUserInfo,
  retrieveUserOrderList,
  orderCancell,
  getUserTestimonials,
  deleteUserTestimonial,
} from "../api/actions.api"
import { formatPrice, loadState, validateData } from "../utils/utils"
import { apiImageURL } from "../api/baseUrls"

export default function MyAccount() {
  const [userData, setUserData] = useState({})
  const [orders, setOrders] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [userTestimonials, setUserTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      validateData(userData)
      const { avatar, ...data } = userData
      const response = await updateUserInfo(data)
      if (response.status === 200) {
        toast.success("Información actualizada exitosamente")
        setUserData(response.data)
        setIsEditing(false)
      }
    } catch (error) {
      console.error(error)
      toast.error("Hubo un error al actualizar la información")
    }
  }

  const handleCancelOrder = async (orderId) => {
    try {
      const data = { user: userData.id, order: orderId, status: "CANCELLED" }
      const response = await orderCancell(data)
      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) => (order.id === orderId ? { ...order, status: "CANCELLED" } : order)),
        )
        toast.success("Orden cancelada exitosamente")
      }
    } catch (error) {
      console.error(error)
      toast.error("Error al cancelar la orden")
    }
  }

  const handleDeleteTestimonial = async (testimonialId) => {
    if (window.confirm("¿Está seguro que desea eliminar el testimonio?")) {
      try {
        const { id } = loadState("user")
        const response = await deleteUserTestimonial({
          user: id,
          testimonial: testimonialId,
        })
        if (response.status === 204) {
          toast.success("Comentario eliminado exitosamente")
          setUserTestimonials((prev) => prev.filter((t) => t.id !== testimonialId))
        }
      } catch (error) {
        console.error(error)
        toast.error("Error al eliminar el comentario")
      }
    }
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const { id } = loadState("user")

        // Cargar información del usuario
        const userResponse = await fetchUserInfo(id)
        if (userResponse.status === 200) {
          setUserData(userResponse.data)
          localStorage.setItem("address", userResponse.data.address)

          // Cargar pedidos
          const ordersResponse = await retrieveUserOrderList(userResponse.data.id)
          if (ordersResponse.status === 200) {
            setOrders(ordersResponse.data)
          }

          // Cargar testimonios
          const testimonialsResponse = await getUserTestimonials(id)
          if (testimonialsResponse.status === 200) {
            setUserTestimonials(testimonialsResponse.data)
          }
        }
      } catch (error) {
        console.error(error)
        toast.error("Error al cargar la información")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          <p className="text-gray-500">Cargando información...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
            <p className="mt-2 text-gray-600">Gestiona tu información personal y revisa tus pedidos</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Información Personal</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg text-cyan-700 bg-cyan-100 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  >
                    <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Editar
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <InputField
                      label="Nombre de usuario"
                      name="username"
                      value={userData.username}
                      onChange={handleInputChange}
                    />
                    <InputField
                      label="Nombres"
                      name="first_name"
                      value={userData.first_name}
                      onChange={handleInputChange}
                    />
                    <InputField
                      label="Apellidos"
                      name="last_name"
                      value={userData.last_name}
                      onChange={handleInputChange}
                    />
                    <InputField
                      label="Email"
                      name="email"
                      type="email"
                      value={userData.email}
                      onChange={handleInputChange}
                    />
                    <InputField
                      label="Teléfono"
                      name="phone"
                      type="tel"
                      value={userData.phone}
                      onChange={handleInputChange}
                    />
                    <InputField
                      label="Dirección"
                      name="address"
                      value={userData.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="relative h-24 w-24">
                      <img
                        src={`${apiImageURL}${userData.avatar}`}
                        alt={userData.username}
                        className="h-24 w-24 rounded-full object-cover ring-4 ring-white"
                      />
                      <div className="absolute inset-0 rounded-full shadow-inner" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {userData.first_name} {userData.last_name}
                      </h3>
                      <p className="text-sm text-gray-500">{userData.email}</p>
                    </div>
                  </div>

                  <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <InfoItem label="Nombre de usuario" value={userData.username} />
                    <InfoItem label="Teléfono" value={userData.phone} />
                    <InfoItem label="Dirección" value={userData.address} />
                    <InfoItem label="Miembro desde" value={new Date(userData.date_joined).toLocaleDateString()} />
                  </dl>
                </div>
              )}
            </div>
          </div>

          {/* Orders and Testimonials */}
          {!userData.is_superuser && (
            <div className="space-y-8">
              {/* Orders */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Mis Pedidos</h2>
                  {orders.length === 0 ? (
                    <EmptyState
                      title="No hay pedidos"
                      description="Aún no has realizado ningún pedido"
                      icon={
                        <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                      }
                    />
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <OrderCard key={order.id} order={order} onCancel={handleCancelOrder} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Testimonials */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Mis Comentarios</h2>
                    <Link
                      to="/testimonials/create/"
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg text-cyan-700 bg-cyan-100 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Nuevo Comentario
                    </Link>
                  </div>

                  {userTestimonials.length === 0 ? (
                    <EmptyState
                      title="No hay comentarios"
                      description="Comparte tu experiencia con otros usuarios"
                      icon={
                        <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                          />
                        </svg>
                      }
                    />
                  ) : (
                    <div className="space-y-6">
                      {userTestimonials.map((testimonial) => (
                        <TestimonialCard
                          key={testimonial.id}
                          testimonial={testimonial}
                          onDelete={handleDeleteTestimonial}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function InputField({ label, name, type = "text", value, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
      />
    </div>
  )
}

function InfoItem({ label, value }) {
  return (
    <div className="px-4 py-2 bg-gray-50 rounded-lg">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  )
}

function OrderCard({ order, onCancel }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "text-green-700 bg-green-100"
      case "CANCELLED":
        return "text-red-700 bg-red-100"
      case "PENDING":
        return "text-yellow-700 bg-yellow-100"
      default:
        return "text-gray-700 bg-gray-100"
    }
  }

  return (
    <div className="flex flex-col space-y-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <Link to={`/orders/details/order/${order.id}`} className="text-cyan-600 hover:text-cyan-700 font-medium">
          Pedido #{order.id}
        </Link>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
            order.status,
          )}`}
        >
          {order.status}
        </span>
      </div>
      <div className="text-sm text-gray-500">
        <p>Fecha: {new Date(order.creation_date).toLocaleDateString()}</p>
        <p className="font-medium text-gray-900">Total: ${formatPrice(order.total)}</p>
      </div>
      {order.status !== "DELIVERED" && order.status !== "CANCELLED" && order.status !== "PENDING" && (
        <button
          onClick={() => onCancel(order.id)}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cancelar Pedido
        </button>
      )}
    </div>
  )
}

function TestimonialCard({ testimonial, onDelete }) {
  return (
    <div className="flex flex-col space-y-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{new Date(testimonial.pub_date).toLocaleDateString()}</p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onDelete(testimonial.id)}
            className="inline-flex items-center p-1 border border-transparent rounded-md text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <p className="text-gray-700">{testimonial.raw_comment}</p>
    </div>
  )
}

function EmptyState({ title, description, icon }) {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center">{icon}</div>
      <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  )
}


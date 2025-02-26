import { Link } from "react-router-dom"
import { apiImageURL } from "../api/baseUrls"
import { useShop } from "../context/ShopContext"
import { formatDate } from "../utils/utils"
import { useAuth } from "../context/AuthContext"

function Testimonials() {
  const { testimonials } = useShop()
  const { isLoggedIn, isAdmin } = useAuth()

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 flex justify-center">
        <div className="w-full max-w-7xl px-4">
          <svg
            className="absolute right-full translate-y-1/4 translate-x-1/4 transform lg:translate-x-1/2"
            width={404}
            height={784}
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern id="testimonials-pattern" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                <rect x={0} y={0} width={4} height={4} className="text-gray-100" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={784} fill="url(#testimonials-pattern)" />
          </svg>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Descubre las experiencias de quienes ya han confiado en nosotros
          </p>
        </div>

        {testimonials && testimonials.length > 0 ? (
          <div className="mx-auto mt-12 grid max-w-lg gap-8 lg:max-w-none lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex flex-1 flex-col justify-between bg-white p-6">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="relative flex-shrink-0">
                        <img
                          className="h-16 w-16 rounded-full object-cover ring-4 ring-white"
                          src={`${apiImageURL}/${testimonial.user_avatar}`}
                          alt=""
                        />
                        <svg
                          className="absolute -right-2 -bottom-2 h-6 w-6 rounded-full bg-white p-0.5 text-cyan-500 ring-2 ring-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">{testimonial.user_fullname}</p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                          <time dateTime={testimonial.pub_date}>{formatDate(testimonial.pub_date)}</time>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-8 flex-1">
                      <svg
                        className="absolute top-0 left-0 h-8 w-8 -translate-x-3 -translate-y-2 transform text-gray-200"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                      >
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <p className="relative text-base text-gray-500">{testimonial.raw_comment}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-lg bg-white p-8 text-center shadow-sm">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay comentarios</h3>
            <p className="mt-1 text-sm text-gray-500">Sé el primero en compartir tu experiencia con nosotros.</p>
            {!isAdmin && isLoggedIn && (
              <div className="mt-6">
                <Link
                  to="/testimonials/create"
                  className="inline-flex items-center rounded-md bg-cyan-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Escribir un comentario
                </Link>
              </div>
            )}
            {!isLoggedIn && (
              <div className="mt-6">
                <Link
                  to="/authenticate"
                  className="inline-flex items-center rounded-md bg-cyan-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                >
                  Iniciar sesión para comentar
                </Link>
              </div>
            )}
          </div>
        )}

        {testimonials?.length > 0 && !isAdmin && isLoggedIn && (
          <div className="mt-12 text-center">
            <Link
              to="/testimonials/create"
              className="inline-flex items-center rounded-md bg-cyan-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Compartir mi experiencia
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default Testimonials


"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loadState, validateData } from "../utils/utils"
import { createTestimonial } from "../api/actions.api"
import toast from "react-hot-toast"

export default function TestimonialsCreate() {
  const navigate = useNavigate()
  const { id } = loadState("user")
  const [testimonial, setTestimonial] = useState({
    raw_comment: "",
    user: id,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const MAX_CHARS = 1000

  const handleChange = (e) => {
    const { name, value } = e.target
    if (value.length <= MAX_CHARS) {
      setTestimonial((prev) => ({
        ...prev,
        [name]: value,
      }))
      setCharCount(value.length)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsSubmitting(true)
      validateData(testimonial)

      if (testimonial.raw_comment.trim().length < 10) {
        toast.error("El comentario debe tener al menos 10 caracteres")
        return
      }

      const response = await createTestimonial(testimonial)
      if (response.status === 201) {
        toast.success("¡Gracias por compartir tu experiencia!")
        navigate("/account", {
          state: { message: "Testimonio publicado exitosamente" },
        })
      }
    } catch (error) {
      console.error(error)
      toast.error("No se pudo publicar el comentario. Por favor, intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Comparte tu Experiencia</h1>
            <p className="mt-2 text-gray-600">Tu opinión nos ayuda a mejorar y a inspirar a otros</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="raw_comment" className="block text-sm font-medium text-gray-700">
                    Tu comentario
                  </label>
                  <div className="mt-1 relative">
                    <textarea
                      id="raw_comment"
                      name="raw_comment"
                      rows={6}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm resize-none transition-colors duration-200"
                      placeholder="¿Qué te pareció tu experiencia con nosotros?"
                      value={testimonial.raw_comment}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                      {charCount}/{MAX_CHARS}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Comparte los detalles de tu experiencia para ayudar a otros usuarios
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  >
                    <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || testimonial.raw_comment.trim().length < 10}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Publicando...
                      </>
                    ) : (
                      <>
                        <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        Publicar Comentario
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-8 bg-cyan-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-cyan-800">Tips para un buen comentario</h3>
            <ul className="mt-2 text-sm text-cyan-700 space-y-1">
              <li className="flex items-center">
                <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Sé específico sobre tu experiencia
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Menciona lo que más te gustó
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Sugiere aspectos a mejorar
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}


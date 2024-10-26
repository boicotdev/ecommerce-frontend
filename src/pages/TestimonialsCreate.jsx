import { useState } from "react";
import { loadState, validateData } from "../utils/utils";
import { createTestimonial } from "../api/actions.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function TestimonialsCreate() {
  const navigate = useNavigate();
  const { id } = loadState("user");
  const [testimonial, setTestimonial] = useState({
    raw_comment: "",
    user: id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestimonial((prevTestimonial) => ({
      ...prevTestimonial,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateData(testimonial);
    console.log(testimonial);
    // Create testimonial
    try {
      const response = await createTestimonial(testimonial);
      if (response.status === 201) {
        toast.success("Testimonio creado exitosamente.");
        setTestimonial({ raw_comment: "", user: id });
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al crear el testimonio.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-16">
      <h1 className="text-3xl font-bold mb-6">Crear Testimonio</h1>

      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8"
      >
        <div className="mb-6">
          <label
            htmlFor="raw_comment"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Comentario
          </label>
          <textarea
            id="raw_comment"
            name="raw_comment"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
            placeholder="Escribe tu comentario aquí"
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Publicar Comentario
          </button>
        </div>
      </form>
    </div>
  );
}

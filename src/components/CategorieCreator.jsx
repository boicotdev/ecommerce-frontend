import { useState } from "react";
import toast from "react-hot-toast";
import { createCategory } from "../api/actions.api";
import { useShop } from "../context/ShopContext";

export default function CategorieCreator() {
  const [categorie, setCategorie] = useState({
    name: "",
    description: "",
  });

  const { setCategories } = useShop();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategorie((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // check the current data
      if (categorie.name.trim() === "" || categorie.description.trim() === "") {
        throw new Error("Todos los campos son obligatorios");
      }

      const response = await createCategory(categorie);
      if (response.status === 201) {
        const newCategory = response.data;

        // Add the new categorie to the list
        setCategories((prev) => {
          return [...prev, newCategory];
        });

        // Reset the form
        setCategorie({
          name: "",
          description: "",
        });
        toast.success("Categoria creada exitosamente");
      }
    } catch (error) {
      const { message } = error;
      console.error(message);
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
            Nombre de la categoria
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={categorie.name}
            onChange={handleChange}
            placeholder="Ej: Frutas"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Descripción
          </label>
          <textarea
            value={categorie.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            name="description"
            id="description"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Crear Categoria
        </button>
      </form>
    </>
  );
}

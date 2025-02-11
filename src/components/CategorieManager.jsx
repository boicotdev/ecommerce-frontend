import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  deleteCategory,
  retrieveCategoryList,
  updateCategory,
} from "../api/actions.api";
import { useShop } from "../context/ShopContext";

export default function CategorieManager() {
  const { categories, setCategories } = useShop();
  const [filter, setFilter] = useState("");
  const [editingCategorie, setEditingCategorie] = useState(null);

  const filteredCategories = categories.filter((categorie) =>
    categorie.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleEdit = (categorie) => {
    setEditingCategorie(categorie);
  };

  const handleDelete = async (categorieId) => {
    try {
      const response = await deleteCategory(categorieId);
      if (response.status === 204) {
        setCategories(
          categories.filter((categorie) => categorie.id !== categorieId)
        );
        setEditingCategorie(null);
        setFilter("");
        toast.success(`Categoria eliminada exitosamente!`);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await updateCategory(editingCategorie);
      if (response.status === 200) {
        const updatedCategorie = response.data;

        setCategories((prevCategories) => {
          return prevCategories.map((categorie) =>
            categorie.id === updatedCategorie.id ? updatedCategorie : categorie
          );
        });
        console.log(updatedCategorie);

        setEditingCategorie(null);
      }
    } catch (error) {
      console.error("Error al actualizar la categoria:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingCategorie({ ...editingCategorie, [name]: value });
  };

  useEffect(() => {
    // localStorage.setItem("coupons", JSON.stringify(coupons));
    const retrieveCategories = async () => {
      try {
        const response = await retrieveCategoryList();
        if (response.status === 200) {
          const categories = response.data;
          setCategories(categories);
        }
      } catch (error) {
        const { message } = error;
        console.error(message);
      }
    };
    retrieveCategories();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {/* Filtro */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filtrar categorias..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Lista de cupones */}
      <div className="space-y-4">
        {filteredCategories.map((categorie) => (
          <div
            key={categorie.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-md"
          >
            <div>
              <h3 className="font-bold">{categorie.name}</h3>
              <p>{categorie.description}</p>
            </div>
            <div>
              <button
                onClick={() => handleEdit(categorie)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(categorie.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de edición */}
      {editingCategorie && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">Editar Categoria</h3>
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Categoria
                </label>
                <input
                  type="text"
                  name="name"
                  value={editingCategorie.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={editingCategorie.description}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditingCategorie(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

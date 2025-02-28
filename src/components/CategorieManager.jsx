import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useShop } from "../context/ShopContext";
import ItemManager from "./ItemManager";
import {
  deleteCategory,
  retrieveCategoryList,
  updateCategory,
} from "../api/actions.api";

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

  // const handleSave = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await updateCategory(editingCategorie);
  //     if (response.status === 200) {
  //       const updatedCategorie = response.data;

  //       setCategories((prevCategories) => {
  //         return prevCategories.map((categorie) =>
  //           categorie.id === updatedCategorie.id ? updatedCategorie : categorie
  //         );
  //       });
  //       console.log(updatedCategorie);

  //       setEditingCategorie(null);
  //     }
  //   } catch (error) {
  //     console.error("Error al actualizar la categoria:", error);
  //   }
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditingCategorie({ ...editingCategorie, [name]: value });
  // };

  useEffect(() => {
    // localStorage.setItem("categorie", JSON.stringify(categories));
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

  const columns = [
    { key: "name", label: "Nombre" },
    { key: "description", label: "Descripción" },
  ];

  return (
    <ItemManager
      title="Gestión de Categorías"
      items={categories}
      columns={columns}
      deleteAction={handleDelete}
      editAction={handleEdit}
    />
  );
}

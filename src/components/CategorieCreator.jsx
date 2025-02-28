import { createCategory } from "../api/actions.api";
import { useShop } from "../context/ShopContext";
import FormCreator from "./FormCreator";

export default function CategorieCreator() {
  const { setCategories } = useShop();

  const initialState = {
    name: "",
    description: "",
  };

  const fields = [
    { label: "Nombre de la Categoría", name: "name", type: "text", placeholder: "Ej: Frutas" },
    { label: "Descripción", name: "description", type: "textarea" },
  ];

  const submitAction = async (formData) => {
    const response = await createCategory(formData);
    setCategories((prev) => [...prev, response.data]);
  };

  return <FormCreator initialState={initialState} fields={fields} submitAction={submitAction} successMessage="Categoría creada exitosamente" />;
}

import { useState, useEffect } from "react";
import { resetForm } from "../utils/utils";
import { toast } from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const CreateUserClient = () => {
  const categories = ["Administrator", "Cliente"];
  const [userClient, setUserClient] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    rol: "",
    avatar: null,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserClient((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      setUserClient({ ...userClient, avatar: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const registerClient = async () => {
    try {
      const response = await createUserClient(product);
      if (response.status === 201) {
        toast.success("Producto creado exitosamente");
        resetForm("product-create__form");
        navigate("/shop/products");
        setImage(null);
      }
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message);

      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    registerClient();
  };

  return (
    <div className="p-2 md:p-4 lg:p-6 mt-20 mb-12">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl sm:text-base font-bold mb-6 text-gray-800 border-b pb-2">
          Crear Nuevo Cliente
        </h2>
        <form
          id="client-create__form"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="main_image"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Imagen de perfíl
            </label>
            <input
              type="file"
              id="image"
              name="main_image"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                cursor-pointer border border-gray-300 rounded-md
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {preview && (
              <div className="mt-2">
                <img
                  src={preview}
                  alt="Vista previa"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300 shadow-sm"
                />
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nombres
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userClient.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userClient.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Dirección
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={userClient.address}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Teléfono
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={userClient.phone}
              onChange={handleChange}
              required
              min="0"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={userClient.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="rol"
              className="block text-sm font-medium text-gray-700"
            >
              Categoria
            </label>
            <select
              id="rol"
              name="rol"
              // value={product.category_id}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Seleccione un rol de usuario</option>
              {categories &&
                categories.length > 0 &&
                categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex items-center justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
            >
              Crear Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserClient;

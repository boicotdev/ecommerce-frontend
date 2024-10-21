import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { validateData, checkPasswordFunc, resetForm } from "../utils/utils";
import { userCreate } from "../api/actions.api";
import toast from "react-hot-toast";

function LoginForm({ callback, isSignup }) {
  const { handleLogin } = useAuth();
  const [userAuth, setUserAuth] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserAuth((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(userAuth);
  };
  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} id="login_form">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre de usuario
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mt-2">
              <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Iniciar Sesión
              </button>
            </div>
            <div className="mt-2 text-center">
              <p className="capitalize text-gray-700">
                ¿No tienes una cuenta?{" "}
                <span
                  className="text-indigo-500 hover:text-indigo-600 cursor-pointer"
                  onClick={() => callback(!isSignup)}
                >
                  Regístrate aquí
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function RegisterForm({ callback, isSignup }) {
  const [image, setImage] = useState(null);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    avatar: null,
    username: "test",
    email: "",
    password: "",
    password_confirmation: "",
    rol: "Cliente",
    is_staff: true,
    is_active: true,
    is_superuser: false,
  });
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setUser({ ...user, avatar: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    validateData(user);
    checkPasswordFunc(user.password, user["password_confirmation"]);
    userRegister();
  };

  const userRegister = async () => {
    try {
      const { password_confirmation, ...userData } = user;
      const response = await userCreate(userData);
      if (response.status === 201) {
        toast.success("Registro Exitoso");
        resetForm("user-register__form");
        //isSignup(true);
      }
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center my-[250px]">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Formulario de registro
        </h2>
        <form onSubmit={handleSubmit} id="user-register__form">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Imagen de perfíl
              </label>
              <input
                type="file"
                id="image"
                name="avatar"
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
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                onChange={handleChange}
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
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Direccióm
              </label>
              <input
                type="text"
                id="address"
                name="address"
                onChange={handleChange}
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
                type="text"
                id="phone"
                name="phone"
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Género
              </label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                <option className="appearance-none bg-white" value="" disabled>
                  Seleccionar
                </option>
                <option className="appearance-none bg-white" value="masculino">
                  Masculino
                </option>
                <option className="appearance-none bg-white" value="femenino">
                  Femenino
                </option>
              </select>
            </div>
            <div className="mt-2">
              <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Registrarme
              </button>
            </div>
            <div className="mt-2 text-center">
              <p className="capitalize text-gray-700">
                ¿Ya tienes una cuenta?{" "}
                <span
                  className="text-indigo-500 hover:text-indigo-600 cursor-pointer"
                  onClick={() => callback(!isSignup)}
                >
                  Inicia sesión aquí
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AuthView() {
  const [isSignup, setIsSignup] = useState(false);
  return isSignup ? (
    <RegisterForm isSignup={isSignup} callback={setIsSignup} />
  ) : (
    <LoginForm callback={setIsSignup} isSignup={isSignup} />
  );
}

import { useState } from "react";
function LoginForm({ callback, isAuth }) {
  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Iniciar Sesión
        </h2>
        <form>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre completo
              </label>
              <input
                type="text"
                id="username"
                name="username"
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
                ¿No tienes una cuenta?{' '}
                <span
                  className="text-indigo-500 hover:text-indigo-600 cursor-pointer"
                  onClick={() => callback(!isAuth)}
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

function RegisterForm({ callback, isAuth }) {
  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Formulario de registro
        </h2>
        <form>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
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
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
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
                ¿Ya tienes una cuenta?{' '}
                <span
                  className="text-indigo-500 hover:text-indigo-600 cursor-pointer"
                  onClick={() => callback(!isAuth)}
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
  const [isAuth, setIsAuth] = useState(true);
  return isAuth ? (
    <RegisterForm isAuth={isAuth} callback={setIsAuth} />
  ) : (
    <LoginForm callback={setIsAuth} isAuth={isAuth} />
  );
}

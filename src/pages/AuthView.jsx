import {useState} from 'react';


function LoginForm({callback, isAuth}) {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Formulario de registro</h2>
            <form>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre completo</label>
                  <input type="text" id="username" name="username" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                  <input type="password" id="password" name="password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8">
          <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Iniciar Sesión
          </button>
        </div>
                <div className="mt-2">
          <p className="capitalize text-gray-700  text-right">No tiene una cuenta ? 
          <span className="text-indigo-500 hover:text-indigo-600 ml-1"
          onClick={() => callback(!isAuth)}
          >
            registrese aquí
          </span></p>
        </div>
      </div>
    </div>
  )
}

function RegisterForm({callback, isAuth}) {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Formulario de registro</h2>
            <form>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre completo</label>
                  <input type="text" id="name" name="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                  <input type="email" id="email" name="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input type="text" id="phone" name="phone" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Genero</label>
                  <select className="mb-1 w-full border border-gray-300 rounded-md shadow-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    <option className="apperance-none bg-white" deactivate>Select</option>
                    <option className="apperance-none bg-white" value="masculino">Masculino</option>
                    <option className="apperance-none bg-white" value="femenino">Femenino</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8">
          <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Registrarme
          </button>
        </div>
        <div className="mt-2">
          <p className="capitalize text-gray-700  text-right">Ya tiene una cuenta ? 
          <span className="text-indigo-500 hover:text-indigo-600 ml-1"
          onClick={() => callback(!isAuth)}
          >
            Inicie Sesión Aqui
          </span></p>
        </div>
      </div>
    </div>
  )
}

export default function AuthView() {
  const [isAuth, setIsAuth] = useState(true);
  return isAuth ? <RegisterForm isAuth={isAuth} callback={setIsAuth}/> : <LoginForm callback={setIsAuth} isAuth={isAuth}/>
}
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
    // Resetear el formulario después de enviar
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Contáctanos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulario de contacto */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Envíanos un mensaje</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                required
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Enviar mensaje
              </button>
            </div>
          </form>
        </div>

        {/* Información de la tienda */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold mb-4">Información de contacto</h2>
            <p className="mb-2"><strong>Dirección:</strong> Calle Principal 123, Ciudad</p>
            <p className="mb-2"><strong>Teléfono:</strong> (123) 456-7890</p>
            <p className="mb-2"><strong>Email:</strong> info@nuestratienda.com</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-2">Horario de atención</h3>
            <p className="mb-1">Lunes a Viernes: 9:00 AM - 8:00 PM</p>
            <p className="mb-1">Sábados: 10:00 AM - 6:00 PM</p>
            <p>Domingos: Cerrado</p>
          </div>

          {/* Mapa simulado */}
          <div className="bg-gray-300 p-4 rounded-lg shadow-md h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📍</div>
              <p className="font-semibold">Nuestra ubicación</p>
              <p className="text-sm text-gray-600">Calle Principal 123, Ciudad</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
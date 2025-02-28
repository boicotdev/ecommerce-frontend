import farm from '../assets/farm.jpg'

export default function AboutUs() {
    return (
      <div className="min-h-screen bg-gray-50/50 py-24 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[60vh] rounded-2xl overflow-hidden bg-gray-900">
            <img
              src={farm || "/placeholder.svg"}
              alt="Vista aérea de campos agrícolas"
              className="w-full h-full object-cover mix-blend-overlay opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white max-w-4xl mx-auto tracking-tight">
                  Cultivando un Futuro Sostenible
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">
                  Somos una cooperativa comprometida con la calidad, la sostenibilidad y el bienestar de nuestras comunidades.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Misión y Valores */}
        <div className="max-w-7xl mx-auto mt-32">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Nuestra Historia
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              Somos una cooperativa de productores del agro comprometida con la sostenibilidad y la calidad, 
              brindando productos frescos, orgánicos y de alta calidad para el bienestar de nuestros consumidores y el planeta.
            </p>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Misión */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl blur opacity-15 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white px-6 py-8 rounded-2xl border border-gray-100 flex flex-col h-full">
                <div className="rounded-xl bg-emerald-50 p-3 w-12 h-12 flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">Misión</h3>
                <p className="mt-3 text-gray-600 flex-1">
                  Ofrecer productos agrícolas frescos, apoyando a los pequeños productores y fomentando 
                  el desarrollo sostenible en armonía con la naturaleza.
                </p>
              </div>
            </div>

            {/* Visión */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl blur opacity-15 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white px-6 py-8 rounded-2xl border border-gray-100 flex flex-col h-full">
                <div className="rounded-xl bg-emerald-50 p-3 w-12 h-12 flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">Visión</h3>
                <p className="mt-3 text-gray-600 flex-1">
                  Ser la cooperativa líder en la distribución de productos agrícolas orgánicos, 
                  promoviendo la agroecología y el comercio justo.
                </p>
              </div>
            </div>

            {/* Compromiso */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl blur opacity-15 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white px-6 py-8 rounded-2xl border border-gray-100 flex flex-col h-full">
                <div className="rounded-xl bg-emerald-50 p-3 w-12 h-12 flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">Compromiso</h3>
                <p className="mt-3 text-gray-600 flex-1">
                  Mejoramos continuamente nuestros procesos para ofrecer productos frescos, 
                  saludables y responsables con el medio ambiente.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="max-w-7xl mx-auto mt-32">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Nuestros Valores
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Los pilares que guían nuestro trabajo diario
            </p>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {[
              "Calidad",
              "Sostenibilidad",
              "Apoyo a Productores",
              "Innovación",
              "Responsabilidad Social"
            ].map((valor) => (
              <div
                key={valor}
                className="relative group cursor-pointer"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full blur opacity-15 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <span className="relative px-6 py-3 bg-white rounded-full inline-flex items-center text-sm font-medium text-emerald-700 border border-gray-100 hover:bg-emerald-50 transition-colors">
                  {valor}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Estadísticas */}
        <div className="max-w-7xl mx-auto mt-32 mb-16">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Productores Asociados', value: '100+' },
              { label: 'Hectáreas Cultivadas', value: '1,000+' },
              { label: 'Años de Experiencia', value: '15+' },
              { label: 'Clientes Satisfechos', value: '10,000+' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="relative group overflow-hidden rounded-2xl"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl blur opacity-15 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white px-6 py-8 rounded-2xl border border-gray-100 text-center">
                  <dt className="text-sm font-medium text-gray-600">{stat.label}</dt>
                  <dd className="mt-2 text-3xl font-bold tracking-tight text-emerald-600">{stat.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    );
}

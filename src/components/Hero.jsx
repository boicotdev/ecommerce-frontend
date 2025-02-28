import { Link } from "react-router-dom"

function Hero() {
  return (
    <div className="relative overflow-hidden bg-white" id="about">
      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-4 -top-4 h-72 w-72 rounded-full bg-cyan-50/50" />
        <div className="absolute -right-4 -bottom-4 h-72 w-72 rounded-full bg-cyan-50/50" />
      </div>

      <div className="container relative mt-12 mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="max-w-xl">
            <div className="relative">
              <div className="inline-flex items-center rounded-full bg-cyan-50 px-4 py-1.5 text-sm font-medium text-cyan-700 ring-1 ring-inset ring-cyan-600/20">
                <span className="mr-2">✨</span>
                <span>Productos 100% Colombianos</span>
              </div>
              <h1 className="mt-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
                Frescura Directa del Campo a Tu Hogar
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Descubre el sabor auténtico de lo natural con nuestras frutas, verduras y productos orgánicos cultivados
                con amor y sostenibilidad. Alimenta a tu familia con lo mejor que la tierra tiene para ofrecer, fresco y
                lleno de vida.
              </p>
              <div className="mt-10 flex items-center gap-6">
                <Link
                  to="/shop"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-cyan-500 px-8 py-4 text-white transition duration-300 ease-out hover:bg-cyan-600"
                >
                  <span className="absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-cyan-600 transition-all duration-300 group-hover:translate-x-0">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <span className="relative flex items-center gap-2 text-base font-semibold transition-all duration-300 group-hover:translate-x-4">
                    Ir a la tienda
                  </span>
                </Link>
                <Link
                  to="/about"
                  className="text-base font-semibold text-slate-600 transition-colors hover:text-cyan-500"
                >
                  Conoce más →
                </Link>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative lg:ml-auto">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-50">
              <img
                src="https://www.palomagazine.com/wp-content/uploads/2019/02/how_to_begin_to_lead_a_healthy_lifestyle.jpg"
                alt="Variedad de frutas y verduras frescas orgánicas"
                className="absolute inset-0 h-full w-full object-cover transition duration-300 hover:scale-105"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/20 to-transparent" />

              {/* Stats */}
              <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 gap-4 bg-white/90 p-6 backdrop-blur-sm">
                <div>
                  <p className="text-3xl font-bold text-cyan-500">100%</p>
                  <p className="mt-1 text-sm text-slate-600">Productos Colombianos</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-cyan-500">24h</p>
                  <p className="mt-1 text-sm text-slate-600">Entrega Express</p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-2 border-dashed border-cyan-200" />
            <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full border-2 border-dashed border-cyan-200" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;

import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container mt-32 mx-auto px-4 py-12" id="about">
      <div className="flex flex-col-reverse md:flex-row items-center gap-8 mb-8">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Frescura Directa del Campo a Tu Hogar
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Descubre el sabor auténtico de lo natural con nuestras frutas,
            verduras y productos orgánicos cultivados con amor y sostenibilidad.
            Alimenta a tu familia con lo mejor que la tierra tiene para ofrecer,
            fresco y lleno de vida.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://www.palomagazine.com/wp-content/uploads/2019/02/how_to_begin_to_lead_a_healthy_lifestyle.jpg"
            alt="Hero image"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="text-center">
        <Link
          to="/shop"
          className="inline-block bg-cyan-500 text-white text-xl font-semibold py-3 px-8 rounded-full hover:bg-cyan-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Ir a la tienda
        </Link>
      </div>
    </div>
  );
}

export default Hero;

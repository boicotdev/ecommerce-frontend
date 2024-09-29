import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="container mt-32 mx-auto px-4 py-12" id="about">
      <div className="flex flex-col-reverse md:flex-row items-center gap-8 mb-8">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Por qué elegirnos</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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
          to="/tienda" 
          className="inline-block bg-cyan-500 text-white text-xl font-semibold py-3 px-8 rounded-full hover:bg-cyan-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Comprar Ahora
        </Link>
      </div>
    </div>
  )
}

export default Hero;
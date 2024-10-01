import { useState } from 'react';

function CreateComment({ onSubmit }){
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Por favor, selecciona una calificación');
      return;
    }
    onSubmit({ rating, review });
    setRating(0);
    setReview('');
  };

  return (
    <div className="max-w-2xl mt-20 mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Califica este producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
            Calificación
          </label>
          <div className="flex items-center">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={`bg-transparent border-none outline-none cursor-pointer ${
                    index <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                  aria-label={`Dar ${index} estrellas`}
                >
                <span className="text-4xl">{/*&#9733;*/}<i className="fa fa-star mx-1"></i></span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="review">
            Tu reseña
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="review"
            rows="4"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Escribe tu reseña aquí..."
          ></textarea>
        </div>
        <div className="flex items-center justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Enviar reseña
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
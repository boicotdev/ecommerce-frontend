import { apiImageURL } from "../api/baseUrls";
import formatDate from "../utils/utils";

function Testimonial({ testimonial }) {
  console.log("Testimonial", testimonial);
  return (
    <div
      key={testimonial.id}
      className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 mr-4 rounded-full overflow-hidden border-2 border-indigo-500">
            <img
              className="w-full h-full object-cover"
              src={`${apiImageURL}/${testimonial.user_avatar}`}
              alt={`${testimonial.user_fullname}'s avatar`}
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {testimonial.user_fullname}
            </h3>
            <p className="text-sm text-gray-600">
              {formatDate(testimonial.pub_date)}
            </p>
          </div>
        </div>
        <p className="text-gray-700 mb-4">{testimonial.raw_comment}</p>
        <div className="flex justify-end">
          <svg
            className="w-8 h-8 text-indigo-500 opacity-50"
            fill="currentColor"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;

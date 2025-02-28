import React from "react";

function Spinner({ size = "large", className = "min-h-96 mt-23" }) {
  const sizes = {
    small: "w-4 h-4 border-2",
    default: "w-8 h-8 border-3",
    large: "w-16 h-16 border-4",
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`${sizes[size]} border-t-emerald-500 border-gray-200 rounded-full animate-spin`}
        role="status"
      >
        <span className="sr-only">Cargando...</span>
      </div>
    </div>
  );
}

export default Spinner;


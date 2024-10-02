import React from "react";

function Spinner() {
  return (
    <div className="min-h-96 mt-23 flex justify-center items-center">
      <div
        className="w-16 h-16 border-4 border-t-red-500 border-gray-200 rounded-full animate-spin"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;

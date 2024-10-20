import { useState } from "react";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiImageURL } from "../api/baseUrls";

function AdminHeader() {
  const { handleLogout, user } = useAuth();
  const [isAccountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const toggleUserOptions = () =>
    setAccountDropdownOpen(!isAccountDropdownOpen);




  return (
    <header className="sticky top-0 z-30 flex justify-between h-14 items-center bg-white px-4 shadow">
      <Link to="/dashboard">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          {/*<span className="text-lg font-bold">Dashboard</span>*/}
        </div>
      </Link>
      <nav className="flex  items-center gap-4">
        {/*<Link to="/dashboard" className="text-gray-500 hover:text-black">
            Dashboard
          </Link>*/}
        <Link to="/dashboard/#orders" className="text-blue-600">
          Pedidos
        </Link>
        <Link to="/shop/products/" className="text-gray-500 hover:text-black">
          Productos
        </Link>
        <Link to="clientes/" className="text-gray-500 hover:text-black">
          Clientes
        </Link>
      </nav>
      <div className="relative">
        <button
          type="button"
          className="overflow-hidden rounded-full border bg-white p-1 transition-all hover:bg-gray-100"
          onClick={toggleUserOptions}
        >
          <img
            src={`${apiImageURL}${user.avatar}`}
            alt={user.username}
            width={36}
            height={36}
            className="overflow-hidden rounded-full"
            style={{ aspectRatio: "36/36", objectFit: "cover" }}
          />
        </button>
        {isAccountDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="block px-4 py-2 text-sm text-gray-500 cursor-pointer hover:text-gray-800">
              <Link to="/account" onClick={() => setAccountDropdownOpen(false)}>
                Mi cuenta
              </Link>
            </div>
            <div className="block px-4 py-2 text-sm text-gray-500 cursor-pointer hover:text-gray-800">
              configuraciones
            </div>
            <div className="block px-4 py-2 text-sm text-gray-500 cursor-pointer hover:text-gray-800">
              Soporte
            </div>
            <div
              className="block px-4 py-2 text-sm text-gray-500 cursor-pointer hover:text-gray-800"
              onClick={handleLogout}
            >
              Salír
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default AdminHeader;

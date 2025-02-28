import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiImageURL } from "../api/baseUrls";

function AdminHeader() {
  const { handleLogout, user } = useAuth();
  const [isAccountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleUserOptions = () => {
    setAccountDropdownOpen(!isAccountDropdownOpen);
    // Cerrar menú móvil si está abierto
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Cerrar dropdown de usuario si está abierto
    if (isAccountDropdownOpen) setAccountDropdownOpen(false);
  };

  const navlinks = {
    orders: {
      path: "/dashboard/#orders",
      label: "Pedidos",
    },
    products: {
      path: "/dashboard/products",
      label: "Productos",
    },
    categories: {
      path: "/dashboard/categories",
      label: "Categorías",
    },
    customers: {
      path: "/dashboard/customers",
      label: "Clientes",
    },
    coupons: {
      path: "dashboard/coupons",
      label: "Cupones",
    },
    delivery: {
      path: "dashboard/deliveryes",
      label: "Entregas",
    },
  };

  const [activeLink, setActiveLink] = useState("");
  
  const handleNavLinkClick = (navLabel) => {
    setActiveLink(navLabel);
    // Cerrar menú móvil después de seleccionar una opción
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 flex justify-between items-center bg-white px-6 py-3 shadow-md border-b border-green-100">
      <Link 
        to="/" 
        onClick={() => {
          setActiveLink("");
          if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        }}
        className="flex items-center gap-2 transition-transform hover:scale-105"
      >
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-green-600"
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
          <span className="text-lg font-semibold text-gray-800 hidden sm:inline">Surti campos y <span className="text-green-600">Cosechas</span></span>
        </div>
      </Link>
      
      {/* Navegación de escritorio */}
      <nav className="hidden md:flex items-center gap-1">
        {Object.entries(navlinks).map(([key, { path, label: navLabel }]) => (
          <Link
            onClick={() => handleNavLinkClick(navLabel)}
            key={key}
            to={path}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 
              ${navLabel === activeLink 
                ? "text-green-700 bg-green-50 border-b-2 border-green-500" 
                : "text-gray-600 hover:text-green-600 hover:bg-green-50"
              }`}
          >
            {navLabel}
          </Link>
        ))}
      </nav>
      
      <div className="relative flex items-center gap-3">
        <button
          type="button"
          className="flex items-center gap-2 overflow-hidden rounded-full border border-gray-200 bg-white p-1 transition-all hover:bg-gray-50 hover:border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
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
          <span className="pr-2 text-sm font-medium text-gray-700 hidden sm:inline">{user.username}</span>
        </button>
        
        {isAccountDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-gray-100">
            <div className="border-b border-gray-100 px-4 py-3">
              <p className="text-sm font-medium text-gray-800">{user.username}</p>
              <p className="text-xs text-gray-500 truncate">{user.email || "Administrador"}</p>
            </div>
            
            <Link 
              to="/account" 
              onClick={() => setAccountDropdownOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Mi cuenta
            </Link>
            
            <div className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 cursor-pointer transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Configuraciones
            </div>
            
            <div className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 cursor-pointer transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Soporte
            </div>
            
            <div className="border-t border-gray-100 mt-1"></div>
            
            <div
              className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
              onClick={handleLogout}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Salir
            </div>
          </div>
        )}
        
        {/* Botón de menú móvil */}
        <div className="md:hidden">
          <button 
            className="p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-green-50 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Menú móvil desplegable */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 md:hidden z-40">
          <nav className="flex flex-col py-2">
            {Object.entries(navlinks).map(([key, { path, label: navLabel }]) => (
              <Link
                onClick={() => handleNavLinkClick(navLabel)}
                key={key}
                to={path}
                className={`px-6 py-3 text-sm font-medium transition-colors duration-200 
                  ${navLabel === activeLink 
                    ? "text-green-700 bg-green-50 border-l-4 border-green-500" 
                    : "text-gray-600 hover:text-green-600 hover:bg-green-50 border-l-4 border-transparent"
                  }`}
              >
                {navLabel}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default AdminHeader;
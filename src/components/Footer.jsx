import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-800 text-slate-200 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-slate-100">Raíces Verdes</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h6 className="text-xl font-semibold mb-4 text-slate-100">Links de interés</h6>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:text-slate-400 transition-colors">Nuestras cosechas</Link></li>
              <li><Link to="#" className="hover:text-slate-400 transition-colors">Seguridad</Link></li>
              <li><Link to="#" className="hover:text-slate-400 transition-colors">Politica de privacídad</Link></li>
            </ul>
          </div>
          {/*<div>
            <h6 className="text-xl font-semibold mb-4 text-slate-100">Tienda</h6>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:text-slate-400 transition-colors">Politica de retorno</Link></li>
              <li><Link to="#" className="hover:text-slate-400 transition-colors">Seguro</Link></li>
              <li><Link to="#" className="hover:text-slate-400 transition-colors"></Link></li>
            </ul>
          </div>*/}
          <div>
            <h6 className="text-xl font-semibold mb-4 text-slate-100">Categorias</h6>
            <ul className="space-y-2">
              <li><Link to="?=frutas" className="hover:text-slate-400 transition-colors">Frutas</Link></li>
              <li><Link to="?=verduras" className="hover:text-slate-400 transition-colors">Verduras</Link></li>
              <li><Link to="?=legumbres" className="hover:text-slate-400 transition-colors">Legumbres</Link></li>
            </ul>
          </div>
        </div>
        <hr className="border-slate-700 mb-6"/>
        <p className="text-center text-sm">
          &copy; {year} Derechos reservados | Desarrollado por{" "}
          <Link to="https://portfolio-rose-nine-33.vercel.app/" rel="opener noopener" target="_blank" className="text-slate-400 hover:text-slate-300 transition-colors">
            Carlos Alberto Guzmán
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer;
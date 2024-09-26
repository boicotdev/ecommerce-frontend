import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-800 text-slate-200 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-slate-100">Ecommerce</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h6 className="text-xl font-semibold mb-4 text-slate-100">About Us</h6>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:text-slate-400 transition-colors">History</Link></li>
              <li><Link to="#" className="hover:text-slate-400 transition-colors">Security</Link></li>
              <li><Link to="#" className="hover:text-slate-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h6 className="text-xl font-semibold mb-4 text-slate-100">Shop</h6>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:text-slate-400 transition-colors">Return Policy</Link></li>
              <li><Link to="#" className="hover:text-slate-400 transition-colors">Insurance</Link></li>
              <li><Link to="#" className="hover:text-slate-400 transition-colors">Gift Card</Link></li>
            </ul>
          </div>
          <div>
            <h6 className="text-xl font-semibold mb-4 text-slate-100">Categories</h6>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:text-slate-400 transition-colors">Home</Link></li>
              <li><Link to="#" className="hover:text-slate-400 transition-colors">Technology</Link></li>
              <li><Link to="#" className="hover:text-slate-400 transition-colors">Fashion</Link></li>
            </ul>
          </div>
        </div>
        <hr className="border-slate-700 mb-6"/>
        <p className="text-center text-sm">
          &copy; {year} All rights reserved | Developed by{" "}
          <Link to="#" className="text-slate-400 hover:text-slate-300 transition-colors">
            Carlos Alberto Guzmán
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer;
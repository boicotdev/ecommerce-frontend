import {Link} from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-700 p-2">
      <h1 className="text-slate-100 text-3xl">Ecommerce</h1>
      <div className="flex flex-col md:flex-row mt-5">
        <div>
          <h6 className="text-slate-200">About Us</h6>
          <ul>
            <li className="text-slate-600">
              <Link to="#">History</Link>
            </li>
            <li className="text-slate-600">
              <Link to="#">Security</Link>
            </li>
            <li className="text-slate-600">
              <Link to="#">Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="text-slate-200">Shop</h6>
          <ul>
            <li className="text-slate-600">
              <Link to="#">Return Policy</Link>
            </li>
            <li className="text-slate-600">
              <Link to="#">Insurence</Link>
            </li>
            <li className="text-slate-600">
              <Link to="#">Gift Card</Link>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="text-slate-200">Categories</h6>
          <ul>
            <li className="text-slate-600">
              <Link to="#">Home</Link>
            </li>
            <li className="text-slate-600">
              <Link to="#">Technology</Link>
            </li>
            <li className="text-slate-600">
              <Link to="#">Fashion</Link>
            </li>
          </ul>
        </div>
      </div>
      <hr className="mt-2 text-slate-900"/>
      <p className="text-center">&copy; {year} All rights reserved | develop by <Link to="#" className="text-slate-500">Carlos Alberto Guzmán</Link> </p>
    </footer>
    )
}

export default Footer;
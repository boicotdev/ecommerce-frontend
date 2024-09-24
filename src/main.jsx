import { createRoot } from 'react-dom/client'
import {HashRouter} from "react-router-dom";
import {CartContextProvider} from "./context/CartContext";
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <CartContextProvider>
      <App />
    </CartContextProvider>
  </HashRouter>
  
)

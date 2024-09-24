import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LatestProducts from "./components/LatestProducts";
import Footer from "./components/Footer";
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
    <Hero />
    <LatestProducts />
    <Footer />
    </>
  )
}

export default App;

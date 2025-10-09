//import { useState } from 'react'
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Blog from "./pages/Blog/Blog.jsx";
import Nosotros from "./pages/Nosotros/Nosotros.jsx";
import MiCuenta from "./pages/MiCuenta/MiCuenta.jsx";
import ProductList from "./components/productList/ProductList.jsx";
import ProductDetail from "./pages/ProductDetail/ProductDetail.jsx";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Cart from "./components/cart/Cart.jsx";
import CartProvider from "./context/CartContext.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";

function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/prendas" element={<ProductList />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/micuenta" element={<MiCuenta />} />
        <Route path="/carrito" element={<Cart />} />
      </Routes>
      <Footer />
    </CartProvider>
  );
}

export default App;

//import { useState } from 'react'
import './App.css'
import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'
import ProductList from './components/productList/ProductList.jsx'
import FAQ from './components/FaQ/FAQ.jsx'
import Blog from './components/blog/PostCard.jsx'




function App() {



  return (
    <>
      <Header />
      <Blog/>

      <ProductList />
      <FAQ />

      <Footer />
    </>

  )
}

export default App

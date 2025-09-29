//import { useState } from 'react'
import './App.css'
import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'
import ProductList from './components/productList/ProductList.jsx'
import FAQ from './components/FaQ/FAQ.jsx'


function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <ProductList />
      <FAQ />
      <Footer />
    </>
  )
}

export default App

//import { useState } from 'react'
import './App.css'
import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'
import ProductList from './components/productList/ProductList.jsx'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <ProductList />
      <Footer />
    </>
  )
}

export default App

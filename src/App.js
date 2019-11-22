import React from "react"
import "./App.css"
import Header from './components/Header'
import Categories from './components/Categories'
import Goods from './components/Goods'
import Footer from './components/Footer'

export default () => (
  <div className="App">
    <Header />
    <Categories />
    <Goods />
    <Footer />   
  </div>
)

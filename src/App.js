import React from "react"
import "./App.css"
import Header from './components/Header'
import Categories from './components/Categories'
import Goods from './components/Goods'
import Footer from './components/Footer'

export default () =>
  <div className="App">
    <Header height={'170px'}/>
    <main className="row pt-3">
      <div className="col-4">
        <Categories />
      </div>
      <div className="col-8">
        <Goods />
      </div>
    </main>
    <Footer height={'100px'}/>
  </div>

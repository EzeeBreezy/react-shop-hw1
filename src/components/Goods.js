import React, { useState } from "react"
import PromiseComponent from "./promiseComponent"
import "../App.css"

const readGoods = async () => {
   const query = `query getAllGoods {
    GoodFind(query: "[{}]") {
      _id, name, price, description, images{
        url
      }
    }
  }`
   let response = await fetch(
      "http://shop-roles.asmer.fs.a-level.com.ua/graphql",
      {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: sessionStorage.authToken
               ? "Bearer " + sessionStorage.authToken
               : ""
         },
         body: JSON.stringify({
            query
         })
      }
   )
   let goods = await response.json()
   return goods
}

const Good = ({props}) => (
    <div className="col mb-4">
      <div className="card" key={props._id} style={{width: 18+"rem"}} >
         <img
              src={props.images 
                ? "http://shop-roles.asmer.fs.a-level.com.ua/" + props.images[0].url 
                : "./image_missing.png"
              }
              className="card-img-top"
              alt="good picture"
         />
         <div className="card-body">
            <h5 className="card-title">{props.name}</h5>
            <h6 className="card-text">{"Price: " + props.price + "$"}</h6>
            <p className="card-text">{props.description}</p>
            <a href="#" className="btn btn-primary">
               Buy now
            </a>
         </div>
      </div>
    </div>
)

const Goods = ({goodsList}) => <div className="row row-cols-3 pl-3">{goodsList.data.GoodFind.map(good => <Good props={good} />)}</div>

export default () => (
   <main className="Main">
      <PromiseComponent
         promise={readGoods()}
         resolve={({ payload }) => <Goods goodsList={payload} />}
      />
   </main>
)

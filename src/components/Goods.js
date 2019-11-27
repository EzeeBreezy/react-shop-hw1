import React, {useState} from "react"
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
          "Accept": "application/json",
          "Authorization": sessionStorage.authToken ? "Bearer " + sessionStorage.authToken : ""
      },
      body: JSON.stringify({
          query
      })
    }
  )
  let goods =  await response.json()
  console.log(goods)
  return goods
}


const Good = ({_id, images, name, price, description}) => 
<>
  <div className="card" style="width: 18rem;" key={{_id}}>
    <img src={"http://shop-roles.asmer.fs.a-level.com.ua/"+{images}} className="card-img-top" alt="good picture" />>
    <div className="card-body">
      <h5 className="card-title">{{name}}</h5>
      <h6 className="card-text">{{price}}</h6>
      <p className="card-text">{{description}}</p>
      <a href="#" className="btn btn-primary">Buy now</a>
    </div>
  </div>
</>
// const Good = (good) => {
// return (
//   <div className="card" style="width: 18rem;" key={good._id} >
//     <img src={"http://shop-roles.asmer.fs.a-level.com.ua/"+good.images ? good.images[0].url : null} className="card-img-top" alt="good picture" />>
//     <div className="card-body">
//       <h5 className="card-title">{good.name}</h5>
//       <h6 className="card-text">{good.price}</h6>
//       <p className="card-text">{good.description}</p>
//       <a href="#" className="btn btn-primary">Buy now</a>
//     </div>
//   </div>
// )}

const Goods = () => {
  const [goodsList, setGoodsList] = useState([])
  readGoods().then(data=>(setGoodsList(data.data.GoodFind), console.log(data)))
  return (
  <>
    {goodsList.map(good => (console.log(good), <Good {...good} />) ) }
  </>
  )
}

export default () => (
  <main className="Main">
    <Goods />
  </main>
)
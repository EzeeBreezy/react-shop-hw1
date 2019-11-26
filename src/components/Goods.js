import React, {useState} from "react"
import "../App.css"

export default () => (
  <div className="Goods">

  </div>
)

// import React, {useState} from "react"
// import "../App.css"

// const readCategories = async () => {
//   const query = `query getAllCategories {
//     CategoryFind(query: "[{}]") {
//       _id, name, image{
//         url
//       }
//     }
//   }`
//   let response = await fetch(
//     "http://shop-roles.asmer.fs.a-level.com.ua/graphql",
//     {
//       method: "POST",
//       headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json",
//           "Authorization": sessionStorage.authToken ? "Bearer " + sessionStorage.authToken : ""
//       },
//       body: JSON.stringify({
//           query
//       })
//     }
//   )
//   let categories =  await response.json()
//   return categories
// }

// const Categories = () => {
//   const [categoriesList, setCategoriesList] = useState([])
//   readCategories().then(data=>(setCategoriesList(data.data.CategoryFind), console.log(data)))
//   const [isActive, setActive] = useState('')
//   const activeClass = 'list-group-item list-group-item-action active'
//   const notActiveClass = 'list-group-item list-group-item-action'
//   return (
//   <div className="list-group list-group-flush">
//     {categoriesList.map(category => <a href="#" className={isActive === category._id ? activeClass : notActiveClass} key={category._id} onClick={e=>(setActive(e.target.key), console.log('im clicked', e.target.key))}>{category.name}</a>)}
//   </div>
//   )
// }

// export default () => 
//   <aside className="Aside">
//     <Categories />
//   </aside>
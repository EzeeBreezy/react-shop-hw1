import React, {useState} from "react"
// import "./App.css"

const Category = ({categoryName}) => <a href="#" className="list-group-item list-group-item-action">{categoryName}</a>

const readCategories = async () => {
  const query = `query getAllCategories {
    CategoryFind(query: "[{}]") {
      name, image{
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
  let categories =  await response.json()
  return categories
  // return (
  //   <>
  //     {categories.data.CategoryFind.map((elem) => (
  //       <Category categoryName={elem.name}/>
  //     ))}
  //   </>
  // )
  // console.log(categories)
  // return categories.data.CategoryFind
}

// let categoriesList = readCategories()
// console.log(categoriesList)

const Categories = async () => {
  let categories = await readCategories()
  const categoriesList = categories.data.CategoryFind.map(elem => <a href="#" className="list-group-item list-group-item-action">{elem.name}</a>)
  return (
  <div className="list-group">
      {categoriesList}
  </div>
  )
}




// export default () => 
//   <aside className="Aside">
//     <Categories />
//   </aside>
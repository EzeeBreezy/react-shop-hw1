import React, {useState} from "react"
import PromiseComponent from './promiseComponent'
import "../App.css"

const readCategories = async () => {
  const query = `query getAllCategories {
    CategoryFind(query: "[{\\"parent\\": null}]") {
      _id, name, image{
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
}

const Categories = ({categoriesList}) => {
  const [isActive, setActive] = useState('')
  const activeClass = 'list-group-item list-group-item-action active'
  const notActiveClass = 'list-group-item list-group-item-action'
  return (
  <div className="list-group list-group-flush">
     {categoriesList.data.CategoryFind.map(category => (<a href="#" className={isActive === category._id ? activeClass : notActiveClass} key={category._id} onClick={e=>setActive(category._id)}>{category.name}</a>))} 
  </div>
  )
}

export default () =>
  <aside className="Aside">
            <PromiseComponent
                promise={readCategories()}
                resolve={({payload}) => <Categories categoriesList={payload} />}
            />
  </aside>
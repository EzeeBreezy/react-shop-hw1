import React, {useState} from "react"
import "../App.css"
import decode from 'jwt-decode'


const LoginForm = ({onLogin}) => {
  const [login, setLogin] = useState("")
  const validLogin = login.length && login.length >= 3
  const [password, setPassword] = useState("")
  const validPassword = password.length && password.length >= 3
  const [searchInp, setSearchInp] = useState("")
  return (
    <>
      <div className="row justify-content-around align-items-center bg-dark">
        <div className="col-3 p-3">
        <i className="fab fa-react" id="reactShopLogo">ShopeactQL</i> 
        </div>
        <div className="col-3 p-3">
          <div className="input-group input-group-sm m-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="scope-addon"><i className="fas fa-search"></i></span>
            </div>
            <input type="text" className="form-control" value={searchInp} onChange={e=>setSearchInp(e.target.value)} placeholder="Search..." aria-describedby="scope-addon"/>
          </div>
        </div>
        <div className="col-3 p-3">
          <div className="row">
            <div className="col">
              <div className='input-group input-group-sm'>
                <input type="text" className="form-control m-3" value={login} onChange={e=>setLogin(e.target.value)} placeholder="Enter login..."/>
                <input type="password" className="form-control m-3" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password..."/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-primary pl-2 pr-2 m-3 w-25" disabled={!validLogin || !validPassword} onClick={()=> onLogin(login, password)}>
                  Login
              </button>
              <button className="btn btn-info pl-2 pr-2 m-3 w-25" disabled={!validLogin || !validPassword} onClick={()=> onLogin(login, password)}>
                  Register
              </button>
            </div>
          </div>
        </div>
        <div className="col-3 p-3 d-none">
          <p className="text-warning">Welcome, Username!</p>
          <button className="btn btn-info pl-2 pr-2 w-50">
              Logout
          </button>
        </div>
      </div>

    </>
  )
}

const loginGraphQL = async (login, password) => {
  return fetch('http://shop-roles.asmer.fs.a-level.com.ua/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query: `query login($login: String, $password: String){
    login(login:$login, password:$password)
  }`,
    variables: { login, password },
  })
})
.then(res => res.json())
.then(data => data.data.login)
}

// loginForm.onsubmit = async e => {
//   e.preventDefault()
//   let { value: login } = userLogin
//   let { value: password } = userPassword
//   if (login && password) {
//     const query = `query login($login: String, $password: String){
//          login(login: $login, password: $password)
//       }`
//     let response = await fetch(
//       "http://shop-roles.asmer.fs.a-level.com.ua/graphql",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json"
//         },
//         body: JSON.stringify({
//           query,
//           variables: { login, password }
//         })
//       }
//     )
//     let returnedData = await response.json()
//     let token = returnedData.data.login
//     if (token) {
//       localStorage.authToken = token
//       decodedToken = jwt_decode(token)
//       console.log(decodedToken) //!!! leaving just for now
//       userName.innerText = `Welcome, ${decodedToken.sub.login}!`
//       userID = decodedToken.sub.id
//       alert("Login successful")
//     } else alert("failed to login")
//   } else alert("Both login and password must be filled")
// }

export default () => {
  let [token, setToken] = useState(false)
  return (
  <div className="Header">
    <LoginForm onLogin={ (l,p) => {
      setToken("PENDING")
      loginGraphQL(l,p).then(token => setToken(token))
      .catch(error => setToken("REJECTED"))
    }} />
  </div>
  )
}

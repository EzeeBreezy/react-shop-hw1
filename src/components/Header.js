import React, {useState} from "react"
// import "./App.css"
import decode from 'jwt-decode'


const LoginForm = ({initLogin, initPass, onLogin}) => {
  const [login, setLogin] = useState(initLogin || "")
  const validLogin = login.length && login.length >= 3
  const [password, setPassword] = useState(initPass || "")
  const validPassword = password.length && password.length >= 3
  return (
    <>
      <div className="row">
        <div className="col-2">
          LOGO
        </div>
        <div className="col-6">
          SEARchBAR
        </div>
        <div className="col-4">
          <div className='input-group'>
            <input type="text" className="form-control m-3" value={login} onChange={e=>setLogin(e.target.value)} placeholder="Enter login..."/>
            <input type="password" className="form-control m-3" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password..."/>
            <button className="btn btn-dark" disabled={!validLogin || !validPassword} onClick={()=> onLogin(login, password)}>
              Login
            </button>
          </div>
        </div>
      </div>

    </>
  )
}

const liginGraphQL = (login, password) => {
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

export default () => {
  let [token, setToken] = useState(false)
  return (
  <div className="Header">
    <LoginForm onLogin={ (l,p) => {
      setToken("PENDING")
      liginGraphQL(l,p).then(token => setToken(token))
      .catch(error => setToken("REJECTED"))
    }} />
  </div>
  )
}

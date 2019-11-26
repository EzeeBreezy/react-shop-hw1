import React, {useState} from "react"
import "../App.css"
import decode from 'jwt-decode'
import RangeInput from './RangeInput'

const Logo = () => 
  <div className="col-3 p-3">
    <i className="fab fa-react" id="reactShopLogo">ShopeactQL</i> 
  </div>

const SearchBar = () => {
  const [searchInp, setSearchInp] = useState("")
  return (
  <div className="col-3 p-3">
    <div className="input-group input-group-sm m-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="scope-addon"><i className="fas fa-search"></i></span>
      </div>
      <input type="text" className="form-control" value={searchInp} onChange={e=>setSearchInp(e.target.value)} placeholder="Search..." aria-describedby="scope-addon"/>
    </div>
  </div>
  )
}

const LoginForm = ({onLogin, onSwitchForm}) => {
  const [login, setLogin] = useState("")
  const validLogin = login.length && login.length >= 3
  const [password, setPassword] = useState("")
  const validPassword = password.length && password.length >= 3
  const [isLoggedIn, setLoggedIn] = useState(false)
  return (
    <>
      {!isLoggedIn
        ? <div className="col-3 p-3" id="loginContainer">
            <div className="row">
              <div className="col">
                <div className='input-group input-group-sm'>
                  <RangeInput min={2} max={10} type="text" className="form-control m-3" placeholder="Enter login..."/>
                  {/* <input type="text" className="form-control m-3" value={login} onChange={e=>setLogin(e.target.value)} placeholder="Enter login..."/> */}
                  <input type="password" className="form-control m-3" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password..."/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <button className="btn btn-primary pl-2 pr-2 m-3 w-25" disabled={!validLogin || !validPassword} onClick={()=> (onLogin(login, password), setLoggedIn(true))}>
                    Login
                </button>
                <button className="btn btn-info pl-2 pr-2 m-3 w-25" onClick={()=> onSwitchForm()}>
                    Register
                </button>
              </div>
            </div>
          </div>

        : <div className="col-3 p-3" id="userNameContainer">
            <p className="text-warning">Welcome, {login}!</p>
            <button className="btn btn-info pl-2 pr-2 w-50" onClick={() => setLoggedIn(false)}>
                Logout
            </button>
          </div>
  }
    </>
  )
}

const RegisterForm = ({onRegister, onSwitchForm}) => {
  const [login, setLogin] = useState("")
  const validLogin = login.length && login.length >= 3
  const [password, setPassword] = useState("")
  const validPassword = password.length && password.length >= 3
  const [password2, setPassword2] = useState("")
  const passwordConfirmed = password === password2
  return (
        <div className="col-3 p-3" id="registerContainer">
          <div className="row">
            <div className="col-6">
              <input type="text" className="form-control form-control-sm m-3" value={login} onChange={e=>setLogin(e.target.value)} placeholder="Enter login..."/>
              <input type="password" className="form-control form-control-sm m-3" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password..."/>
              <input type="password" className="form-control form-control-sm m-3" value={password2} onChange={e=>setPassword2(e.target.value)} placeholder="Confirm password..."/>
            </div>
            <div className="col-6">
              <button className="btn btn-primary pl-2 pr-2 m-3 w-75" disabled={!validLogin || !validPassword || !passwordConfirmed} onClick={()=> onRegister(login, password)}>
                  Create account
              </button>
              <button className="btn btn-info pl-2 pr-2 m-3 w-75" onClick={()=> onSwitchForm()}>
                  Back to Login
              </button>
            </div>
          </div>
        </div>
  )
}

const Header = ({height}) => {
  const [isRegisterShowed, setRegisterShowed] = useState(false)
  return (
    <header style={{height}}>
    <div className="row justify-content-around align-items-center bg-dark mb-3" style={{height}} >
      <Logo />
      <SearchBar />
      {isRegisterShowed 
        ? <RegisterForm onRegister={(l,p)=> registerGraphQL(l,p)} onSwitchForm={()=> setRegisterShowed(false)}/>
        :  <LoginForm onLogin={ (l,p) => loginGraphQL(l,p)} onSwitchForm={()=> setRegisterShowed(true)} /> }
    </div>
  </header>
  )
}

const loginGraphQL = async (login, password) => {
  const query = `query login($login: String, $password: String){
    login(login: $login, password: $password)
    }`
   let response = await fetch(
     "http://shop-roles.asmer.fs.a-level.com.ua/graphql",
     {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Accept: "application/json"
       },
       body: JSON.stringify({
         query,
         variables: { login, password }
       })
     }
   )
   let returnedData = await response.json()
   let token = returnedData.data.login
   if (token) {
     sessionStorage.authToken = token
     let decodedToken = decode(token)
     console.log(decodedToken, decodedToken.sub.login) //!!! leaving just for now
   } else alert("failed to login")
}

const registerGraphQL = async(login, password) => {
  const query = `mutation reg($login: String, $password: String){
        UserUpsert(user: {login: $login, password: $password}){
            _id
        }
     }`
  let response = await fetch(
        "http://shop-roles.asmer.fs.a-level.com.ua/graphql",
        {
           method: "POST",
           headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
           },
           body: JSON.stringify({
              query,
              variables: { login, password }
           })
        }
     )
  let returnedData = await response.json()
  returnedData.data.UserUpsert
    ? alert("registration successful!")
    : alert("user with this name already exists!")
}

export default ({height}) => <Header height={height}/>

  


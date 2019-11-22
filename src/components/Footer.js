import React from "react"
import "../App.css"


const Credits = ({height}) => 
    <>
      <div className="row justify-content-end align-items-center bg-dark" style={{height}}>
        <div className="col-5">
          <p id="credits">
            <i className="fab fa-bootstrap"></i>
            <i className="fab fa-react"></i> 
             Shop template, React homework 1, Panchenko Vlad, FS1a
          </p>
        </div>
      </div>
    </>

export default ({height}) => 
  <footer className="Footer" style={{height}}>
    <Credits height={height}/>
  </footer>


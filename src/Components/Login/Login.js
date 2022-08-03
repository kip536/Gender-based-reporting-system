import React from "react";
import "../Login/Login.css";
import { useState } from "react";
import PropTypes from "prop-types";
import axios from 'axios';


function Login({handleDetails, handleChange}) {

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [userdetails, setUserdetails] = useState([])

  
  
  // async function loginuser(credentials) {
  //   return fetch('http://localhost/fgm/signin.php', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(credentials)
  //   })
  //   .then(data => data.json())
    
  // }


  // const handleDetails= async (e) =>{
  //   e.preventDefault()
  //   const token= await loginuser({name, password});
    
  //   localStorage.setItem('token', JSON.stringify(token))
  //   // console.log('token:',token)
  // }

  // const postandfetchtoken = () => {
    
  // }


  

  return (
    <div className="login">
      <div className="center">
        <h1>User Login</h1>
        <form onSubmit={handleDetails}>
        <div className="login-container">
          <label>Username</label>
          <input
            type="text"
            placeholder="username"
            id="username"
            className="login-input"
            // value={name}
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            id="password"
            className="login-input"
            // value={password}
            onChange={handleChange}
          />
          <button className="login-button" type="submit">
            
            Login
          </button>
         
          
          </div>
          </form>
      </div>
    </div>
  );
}

Login.prototype = {
  setToken: PropTypes.func.isRequired
}

export default Login;

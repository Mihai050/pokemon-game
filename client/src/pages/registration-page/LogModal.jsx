import React, { useState } from "react";
import "./LogModal.css";

export default function LogModal(props) {
  const [userData, setUserData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
    
  const fillUserData = function (e, type) {
    setUserData({...userData, [type]: e.target.value})
  };

  const sendUserData = async function (e){
    e.preventDefault();
    let id = null;
    await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: userData.username, password: userData.password }),
    })
      .then((response) => response.json())
      .then((data) => {
        id = data.key;
      });

      if(id){
        localStorage.setItem("userData", JSON.stringify(id));
        console.log(id);
        props.goForward();
      } else {
        console.log("err")
        setErrorMessage(true);
      }

  }


  return (
    <div className="signIn">
      Log into your account
      <div>
        <input
          className="inputField"
          onChange={(e) => {
            fillUserData(e, "username");
          }}
          type="text"
          name="username"
          placeholder="Your username!"
        />
        <input
          className="inputField"
          onChange={(e) => {
            fillUserData(e, "password");
          }}
          type="password"
          name="password"
          placeholder="Password"
        />
        <button className="forgotButton"> Forgot Password? Send e-mail!</button>
        <button className="submitButton" onClick={sendUserData}>Login</button>
        {errorMessage && <div className="errorMessage">You have entered the wrong password or this user does not exist!</div>}
      </div>
      <button className="goBackButton" onClick={props.goBackFunction}>
        Go back!
      </button>
    </div>
  );
}

import React, { useState } from "react";
import "./SignModal.css";

export default function SignModal(props) {

  const [userData, setUserData] = useState({})   
  const [userRegistered, setUserRegistered] = useState(false);
  const [userAlert, setUserAlert] = useState(null);
  


  const fillUserData = function (e, type) {
    setUserData({ ...userData, [type]: e.target.value });
  };


  const accountCheck = async function (data) {
    let isValid = {
      status: true,
      Message: "Wait for loading...",
    };

    if (data.password.length < 8 || data.password !== data.passwordAgain) {
      isValid = {
        status: false,
        message: "Passwords does not correspond or are too short!",
      };
      return isValid;
    }

    if (data.email.length < 5 || data.email.indexOf("@") === -1) { 
      isValid = {
        status: false,
        message: "Invalid email address!",
      };
      return isValid;
    }

    let isUserTaken;

    await fetch("http://localhost:8080/api/checkUsername", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: data.username}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        isUserTaken = data;
      });

      if(isUserTaken.value){
        isValid = {
          status: false,
          message: "Username is already taken!",
        };
        return isValid;
      }

    return isValid;
  };

  const sendUserData = async function (e) {
      e.preventDefault();
      const validation = await accountCheck(userData);
      if(validation.status){
        await fetch("http://localhost:8080/api/register", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
       //props.goForward();
       console.log(userData)
       setUserRegistered(true);
       setUserAlert(null);
      } else {
        console.log(validation);
        setUserAlert(validation.message);
        
      }
  };
  return (
    <div className="signUp">
      Create your account
      <form>
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
            fillUserData(e, "email");
          }}
          type="text"
          name="mail"
          placeholder="Your email address!"
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
        <input
          className="inputField"
          onChange={(e) => {
            fillUserData(e, "passwordAgain");
          }}
          type="password"
          name="passwordAgain"
          placeholder="Repeat the password!"
        />
        {userRegistered ? null :<input className="submitButton" onClick={sendUserData} type="submit" value="Submit" />}
      </form>
      <button className="goBackButton" onClick={props.goBackFunction}>
        Go back!
      </button>
      {userAlert && <div className="wrongMessage">There was something wrong! {userAlert}</div>}
      {userRegistered && <div className="goodMessage">Succesfully registered! Use Go Back! and Log In with your account!</div>}
    </div>
  );
}

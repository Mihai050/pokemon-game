import React, { useState } from "react";
import LogModal from "./LogModal";
import SignModal from "./SignModal";
import "./Login.css";

export default function Login(props) {
  const [authType, setAuthType] = useState(null);
  

  // const [userData, setUserData] = useState(null);

  return (
    <div className="loginScreen">
      <dialog className="loginModal">
        <h2>AUTHENTIFICATION</h2>
        {!authType ? (
          <div className="logChoice">
            <button
              onClick={() => {
                setAuthType("sign");
              }}
            >
              Sign Up
            </button>
            <button
              onClick={() => {
                setAuthType("log");
              }}
            >
              Login
            </button>
          </div>
        ) : authType === "log" ? (
          <LogModal
            goForward={props.onPage}
            goBackFunction={() => {
              setAuthType(null);
            }}
          />
        ) : authType === "sign" ? (
          <SignModal
            goForward={props.onPage}
            goBackFunction={() => {
              setAuthType(null);
            }}
          />
        ) : null}
      </dialog>
    </div>
  );
}

import React, { useState } from "react";
import './login.css'

import { login, useLoggedIn } from "../../lib/cart";

export default function Login() {
  const loggedIn = useLoggedIn();

  const [username, setUsername] = useState("test");
  const [password, setPassword] = useState("mySecretKey");

  if (loggedIn) return null;

  return (
    <>
        <div className="mainContainer" >
          <input
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(evt) => setUsername(evt.target.value)}
            className="inputBox"
          />
          <input
            type="password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            className="inputBox"
          />
          <button
            className="smallButton"
            onClick={() => login(username, password)}
            id="loginbtn"
          >
            Login
          </button>
        </div>
    </>
  );
}

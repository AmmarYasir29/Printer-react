import img from "../img/sign.svg";
import "../style.css";
import React, { useState, useEffect } from "react";
function Login() {
  useEffect(() => {
    document.title = "Sign In";
  }, []);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const changeUsername = (e) => setUsername(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  function handlSubmit(e) {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ phone: username, password });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("https://iq-printer.herokuapp.com/login", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
  return (
    <>
      <div className="continer">
        <h1>Get Started</h1>
        <form className="my-form" onSubmit={handlSubmit}>
          <div className="config">
            <label>Name</label>
            <input placeholder="Name" type="text" />
          </div>
          <div className="config">
            <label>Email</label>
            <input
              placeholder="Email"
              name="email"
              onChange={changeUsername}
              type="text"
            />
          </div>
          <div className="config">
            <label>Password</label>
            <input type="password" name="password" onChange={changePassword} />
          </div>
          <input className="sign" type="submit" value="Sign Up" />
          <input className="sign" type="submit" value="Sign In" />
        </form>
      </div>
      <img src={img} alt="Sign In img" />
    </>
  );
}

export default Login;

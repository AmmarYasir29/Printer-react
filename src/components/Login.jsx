import img from "../img/sign.svg";
import "../style.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Login() {
  useEffect(() => {
    document.title = "Sign In";
  }, []);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const changePhone = (e) => setPhone(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  function handlSubmit(e) {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ phone, password });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("https://iq-printer.herokuapp.com/login", requestOptions)
      .then((response) => response.text())
      .then((result) => alert("You Login!"))
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
            <label>Phone</label>
            <input
              placeholder="Phone"
              name="phone"
              onChange={changePhone}
              type="number"
            />
          </div>
          <div className="config">
            <label>Password</label>
            <input type="password" name="password" onChange={changePassword} />
          </div>
          <input className="sign" type="submit" value="Sign In" />
          <Link to="/singup">
            <input className="sign" type="button" value="Sign Up" />
          </Link>
        </form>
      </div>
      <img src={img} alt="Sign In img" />
    </>
  );
}

export default Login;

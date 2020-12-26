import "../style.css";
import img from "../img/sign.svg";
import React, { useEffect, useState } from "react";

const Signup = () => {
  useEffect(() => {
    document.title = "Sign Up";
  }, []);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const changePhone = (e) => setPhone(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  const changeName = (e) => setName(e.target.value);

  function handlSubmit(e) {
    e.preventDefault();

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      name,
      phone,
      password,
      Lang: "1111111",
      lat: "22222222",
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://iq-printer.herokuapp.com/register", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (!result.status) return alert(result.err);
        return alert(result.status);
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <>
      <div className="continer">
        <div className="intro">
          <h1>Sign Up</h1>
          <p>It’s quick and easy.</p>
        </div>
        <form className="my-form" onSubmit={handlSubmit}>
          <div className="config">
            <label>Name</label>
            <input placeholder="Name" onChange={changeName} type="text" />
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
          <input className="register" type="submit" value="Sign Up" />
        </form>
      </div>
      <img src={img} alt="Sign In img" />
    </>
  );
};

export default Signup;

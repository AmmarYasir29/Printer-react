import "../Style/style.css";
import img from "../img/sign.svg";
import React, { useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Signup = () => {
  useEffect(() => {
    document.title = "Sign Up";
  }, []);
  const history = useHistory();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState([]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
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
        if (!result.status) {
          setOpen(true);
          //IF the error MSG is obj
          if (typeof result.err === "object") {
            setOpen(true);
            Object.keys(result.err).forEach((key) => {
              setMsg(result.err[key]);
            });
          } //ELSE IF the error MSG is not obj
          else setMsg(result.err);
        } else {
          setOpen(false);
          history.push("/");
        }
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <>
      {open ? (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert severity="error"> {msg}</Alert>
        </Snackbar>
      ) : (
        console.log("correct info!")
      )}
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

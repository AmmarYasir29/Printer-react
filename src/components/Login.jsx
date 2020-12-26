import img from "../img/sign.svg";
import "../style.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import Snackbar from "@material-ui/core/Snackbar";
// import MuiAlert from "@material-ui/lab/Alert";
// import { makeStyles } from "@material-ui/core/styles";

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }
// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     "& > * + *": {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));
function Login() {
  useEffect(() => {
    document.title = "Sign In";
  }, []);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  // const [open, setOpen] = React.useState(false);
  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen(false);
  // };
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
      .then((response) => response.json())
      .then((result) => {
        if (!result.status) {
          return alert(result.err);
          //TODO: add beuty alert from matirial UI
          // setOpen(true);
          // console.log(open);
          // <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          //   <Alert severity="error">This is an error message!</Alert>
          // </Snackbar>;
        }
        return alert(result.status);
      })
      .catch((error) => alert(error));
  }
  return (
    <>
      <div className="continer">
        <h1>Get Started</h1>
        <form className="my-form" onSubmit={handlSubmit}>
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
          <br/>
          <Link to="/singup">
            <input className="signup" type="button" value="Create New Account" />
          </Link>
        </form>
      </div>
      <img src={img} alt="Sign In img" />
    </>
  );
}

export default Login;

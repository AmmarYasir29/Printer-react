import img from "../img/sign.svg";
import "../style.css";
import {useEffect} from "react"
function Login() {
  useEffect(() => {
    document.title = "Sign In"
 }, []);
  return (
    <>
    <div className="continer">
      <h1>Get Started</h1>
      <form className="my-form">
        <div className="config">
          <label>Name</label>
          <input placeholder="Name" type="text"></input>
        </div>
        <div className="config">
          <label>Email</label>
          <input placeholder="Email" type="text"></input>
        </div>
        <div className="config">
          <label>Password</label>
          <input type="password"></input>
        </div>
        <input className="sign" type="submit" value="Sign Up"></input>
        <input className="sign" type="submit" value="Sign In"></input>
      </form>
      </div>
      <img src={img} alt="Sign In img" />
    </>
  );
}

export default Login;

import Login from "./components/Login";
import Signup from "./components/signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/singup" component={Signup} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

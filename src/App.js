import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/signup";
import ErrorBoundary from "../src/components/ErrorHandle";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/singup" component={Signup} />
            <Route path="/home" component={Home} />
          </Switch>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

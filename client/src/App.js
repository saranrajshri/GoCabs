import React from "react";

//Routers
import { BrowserRouter as Router } from "react-router-dom";

// Stylesheets
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

//Components
import UserSearchIndex from "./components/UserSearch/UserSearchIndex";
import DriverLogin from "./components/DriverPages/DriverLogin/DriverLogin";

//React Router(dont change the order of this react router)
const Route = require("react-router-dom").Route;

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/search" exact component={UserSearchIndex} />
        <Route path="/Drivers/Login" exact component={DriverLogin} />
      </Router>
    </div>
  );
}

export default App;

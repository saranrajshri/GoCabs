import React from "react";

//Routers
import { BrowserRouter as Router } from "react-router-dom";

// Stylesheets
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

//Components
import UserSearchIndex from "./components/UserSearch/UserSearchIndex";
import DriverLoginIndex from "./components/DriverPage/DriverLogin/DriverLoginIndex";
import DriverDashBoardIndex from "./components/DriverPage/DriverDashBoard/DriverDashBoardIndex";
import UserOrderIndex from "./components/UserOrder/UserOrderIndex";

//React Router(dont change the order of this react router)
const Route = require("react-router-dom").Route;

function App() {
  return (
    <div className="App overflow-x-hidden">
      <Router>
        <Route path="/search" exact component={UserSearchIndex} />
        <Route path="/driver/login" exact component={DriverLoginIndex} />
        <Route
          path="/driver/dashboard"
          exact
          component={DriverDashBoardIndex}
        />
        <Route path="/user/order" exact component={UserOrderIndex} />
      </Router>
    </div>
  );
}

export default App;

import React from "react";
// axios
import axios from "axios";
// importing context
import DriverDashBoardContext from "./DriverDashBoardContext";

class DriverDashBoardGetARide extends React.Component {
  constructor() {
    super();
    this.state = {
      searchingCustomers: ""
    };
  }

  listenForCustomers = () => {
    axios
      .post("http://localhost:8000/api/user/findNearByUsers", {
        lat: this.context.driverData.coordinates[0],
        lon: this.context.driverData.coordinates[1]
      })
      .then(response => {
        this.setState({
          searchingCustomers: response.data
        });
      });
  };
  componentDidMount() {
    this.interval = setInterval(() => {
      this.listenForCustomers();
    }, 1000);
  }
  render() {
    // console.log(this.state.searchingCustomers);
    return (
      <div className="border border-muted p-3 mt-3">
        {this.state.searchingCustomers === "" ? (
          <p className="text-secondary">No customer nearby your location</p>
        ) : (
          this.state.searchingCustomers.map((details, index) => {
            return (
              <div key={index}>
                <p className="text-secondary">
                  Customer Name :
                  <span className="text-secondary font-weight-bold">
                    {details.username}
                  </span>
                </p>
              </div>
            );
          })
        )}
      </div>
    );
  }
}
DriverDashBoardGetARide.contextType = DriverDashBoardContext;
export default DriverDashBoardGetARide;

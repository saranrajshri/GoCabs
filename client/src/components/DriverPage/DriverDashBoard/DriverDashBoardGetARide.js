import React from "react";
// axios
import axios from "axios";
// importing context
import DriverDashBoardContext from "./DriverDashBoardContext";

// Bootstap components
import { Button, Col, Row, Spinner } from "react-bootstrap";

class DriverDashBoardGetARide extends React.Component {
  constructor() {
    super();
    this.state = {
      searchingCustomers: "",
      customerFromAddress: "",
      customerToAddress: "",
      viewButtons: false
    };
  }

  listenForCustomers = () => {
    // console.log(   this.context.driverData, this.state.searchingCustomers);
    if (this.context.driverData.coordinates !== []) {
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
    }
  };
  // accept order

  componentDidMount() {
    this.interval = setInterval(() => {
      this.listenForCustomers();
    }, 1000);
  }
  stopSearch = () => {
    clearInterval(this.interval);
    this.setState({ viewButtons: true });
  };

  render() {
    // console.log(this.state.customerFromAddress, this.state.customerToAddress);
    // if (this.state.searchingCustomers !== "") {
    //   console.log(this.state.searchingCustomers[0]);
    // }
    return (
      <div className="border border-muted p-3 mt-3">
        <Row
          hidden={this.state.viewButtons}
          className="border-bottom border-muted"
        >
          <Col>
            <span className="text-primary font-weight-bold">
              Searching Customers{"  "}
            </span>
            <Spinner animation="border" size="sm" variant="warning" />
          </Col>
          <Col>
            <button
              onClick={this.stopSearch}
              className="btn btn-link small float-right text-decoration-none"
            >
              Stop Search
            </button>
          </Col>
        </Row>

        {this.state.searchingCustomers === "" ? (
          <p className="text-secondary">No customer nearby your location</p>
        ) : (
          this.state.searchingCustomers.map((details, index) => {
            return (
              <div key={index} className="mt-2">
                <p className="text-secondary">
                  Customer Name :
                  <span className="text-secondary font-weight-bold">
                    {details.username}
                  </span>
                </p>
                <p className="text-secondary">
                  Pickup Location:
                  <span className="text-secondary font-weight-bold">
                    {details.originTitle}
                  </span>
                </p>
                <p className="text-secondary">
                  Drop Location:
                  <span className="text-secondary font-weight-bold">
                    {details.destinationTitle}
                  </span>
                </p>
                {this.state.viewButtons ? (
                  <Button
                    onClick={() => {
                      axios.put("http://localhost:8000/api/user/bookcab", {
                        userid: details._id,
                        driverid: this.context.driverData.id
                      });
                      axios.post("http://localhost:8000/api/order/addOrder", {
                        userid: details._id,
                        driverid: this.context.driverData.id,
                        originLat: details.originData[0],
                        originLon: details.originData[1],
                        originTitle: details.originTitle,
                        destinationLat: details.destinationData[0],
                        destinationLon: details.destinationData[1],
                        destinationTitle: details.destinationTitle,
                        isRideFinished: false
                      });
                      window.location = "/driver/dashboard";
                    }}
                  >
                    Accept Order
                  </Button>
                ) : null}
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

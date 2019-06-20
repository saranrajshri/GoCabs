import React from "react";

// importing  context
import DriverDashBoardContext from "./DriverDashBoardContext";
// Bootsrap components
import { Row, Col, Button } from "react-bootstrap";

// Fontawesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

// axios
import axios from "axios";

class DriverDashBoardPickUpsToDoSideBar extends React.Component {
  constructor() {
    super();
    this.state = {
      orderData: []
    };
  }

  getUserData = () => {
    axios
      .post("http://localhost:8000/api/user/getUserDetails", {
        userid: this.props.orderData.userid
      })
      .then(response => {
        console.log(response);
      });
  };
  componentDidMount() {
    this.interval = setInterval(() => {
      this.getUserData();
    }, 1000);
  }
  render() {
    // console.log(this.context.orderData);
    return (
      <div className="p-2">
        <div className="border border-muted p-2 mb-2">
          <Row>
            <Col>
              <Button variant="success" size="sm">
                Show Route To Customer Location
              </Button>
            </Col>
            <Col>
              <Button variant="primary" size="sm">
                Request Landmark Pic
              </Button>
            </Col>
            <Col>
              <Button variant="info" size="sm">
                Customer Pick Up Completed
              </Button>
            </Col>
          </Row>
        </div>
        <div className="border border-muted p-2 mb-2">
          <Row>
            <Col>
              <h6 className="text-primary small mb-3 font-weight-bold">
                Directions
              </h6>
            </Col>
            <Col>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="float-right mr-2"
              />
            </Col>
          </Row>
        </div>
        <div className="p-2 border border-muted">
          <h6 className="text-primary small mb-3 font-weight-bold">
            Customer Details
          </h6>
          <Row>
            <Col>
              <p className="small text-secondary">
                Name:<span className="font-weight-bold">Saranraj</span>
              </p>
            </Col>
            <Col>
              <p className="small text-secondary">
                Contact :<span className="font-weight-bold">09876543</span>
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="small text-secondary">
                Pickup:
                <span className="font-weight-bold">
                  {this.props.orderData.originTitle}
                </span>
              </p>
            </Col>
            <Col>
              <p className="small text-secondary">
                Drop:
                <span className="font-weight-bold">
                  {this.props.orderData.destinationTitle}
                </span>
              </p>
            </Col>
          </Row>
        </div>

        {/* Road Conditions */}
        <div className="border border-muted mt-2  p-2">
          <h6 className="text-primary small mb-3 font-weight-bold">
            Road And Route Details
          </h6>
          <Row>
            <Col>
              <p className="small text-secondary">
                Name:<span className="font-weight-bold">Saranraj</span>
              </p>
            </Col>
            <Col>
              <p className="small text-secondary">
                Contact :<span className="font-weight-bold">09876543</span>
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="small text-secondary">
                Pickup:<span className="font-weight-bold">Kundrathur</span>
              </p>
            </Col>
            <Col>
              <p className="small text-secondary">
                Drop:
                <span className="font-weight-bold">
                  Chennai Institute of Technology
                </span>
              </p>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
DriverDashBoardPickUpsToDoSideBar.contextType = DriverDashBoardContext;
export default DriverDashBoardPickUpsToDoSideBar;

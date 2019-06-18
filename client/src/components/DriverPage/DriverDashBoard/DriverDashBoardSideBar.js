import React from "react";

// importing context
import DriverDashBoardContext from "./DriverDashBoardContext";

// Bootstrap Components
import { Image, Card } from "react-bootstrap";

// Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
class DriverDashBoardSideBar extends React.Component {
  render() {
    // console.log(this.context.driverData);
    return (
      <div>
        <Card>
          <Card.Body>
            <div>
              <Image
                src="https://omniproperties.com/wp-content/uploads/2014/09/male-place-holder.png"
                className="w-100"
              />
            </div>
          </Card.Body>
        </Card>
        <Card className="mt-2">
          <Card.Body>
            <h5>
              {this.context.driverData.username}
              <span className="small text-success ml-5">
                <FontAwesomeIcon icon={faGlobeAmericas} className="mr-1" />
                Available
              </span>
            </h5>
            <hr />
            <p className="small text-secondary">
              Vechile Number : <span className="font-weight-bold">ABC123</span>
            </p>
            <p className="small text-secondary">
              Vechile Name :{" "}
              <span className="font-weight-bold">Hundai i10</span>
            </p>
            <p className="small text-secondary">
              Max Capacity : <span className="font-weight-bold">6</span>
            </p>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
DriverDashBoardSideBar.contextType = DriverDashBoardContext;
export default DriverDashBoardSideBar;

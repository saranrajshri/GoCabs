import React from "react";

import UserSearchContext from "./UserSearchContext";

import { Form, Button } from "react-bootstrap";

import axios from "axios";

class DifferentWaysOfTransportModalMap extends React.Component {
  constructor() {
    super();
    this.state = {
      showLessThanTwoIsOpen: false,
      showGreaterThanTwoIsOpen: false,
      bicycleRoute: [],
      publicTransport: []
    };
  }
  componentDidMount() {
    axios
      .get(
        "http://route.api.here.com/routing/7.2/calculateroute.json?app_id=xPIcFc8xn5PLiheKwn5pX&app_code=8f8NlzUfaHYVJuitDFoDgA&waypoint0=geo!" +
          this.context.originData.originLat +
          "," +
          this.context.originData.originLon +
          "&waypoint1=geo!" +
          this.context.destinationData.destinationLat +
          "," +
          this.context.destinationData.destinationLon +
          "&mode=fastest;bicycle"
      )
      .then(response => {
        this.setState({
          bicycleRoute: response.data.response
        });
      });
    //  public transporrt
    axios
      .post(
        "http://route.api.here.com/routing/7.2/calculateroute.json?waypoint0=" +
          this.context.originData.originLat +
          "%2C" +
          this.context.originData.originLon +
          "&waypoint1=" +
          this.context.destinationData.destinationLat +
          "%2C" +
          this.context.destinationData.destinationLon +
          "&mode=fastest%3BpublicTransport&combineChange=true&app_id=xPIcFc8xn5PLiheKwn5pX&app_code=8f8NlzUfaHYVJuitDFoDgA"
      )
      .then(response => {
        this.setState({
          publicTransport: response.data.response
        });
      });
  }
  render() {
    console.log(this.state.publicTransport);
    return (
      <div className="p-2">
        <h6 className="font-weight-bold text-primary">
          Please select the number of passengers
        </h6>
        <Form.Check
          type="radio"
          name="opt"
          label="less than two "
          id="radio"
          onClick={() => {
            this.setState({
              showLessThanTwoIsOpen: true,
              showGreaterThanTwoIsOpen: false
            });
          }}
        />
        <Form.Check
          type="radio"
          name="opt"
          label="more than two"
          id="radio1"
          onClick={() => {
            this.setState({
              showGreaterThanTwoIsOpen: true,
              showLessThanTwoIsOpen: false
            });
          }}
        />
        <hr />
        {this.state.showLessThanTwoIsOpen ? (
          <div>
            <p className=" text-primary font-weight-bold">Bicycle</p>
            <p className="text-secondary">
              Distance : <span className="font-weight-bold">{"22 km"}</span>
            </p>
            <p className="text-secondary">
              TravelTime <span className="font-weight-bold">:{"28 mins "}</span>
            </p>
            <p className="text-secondary">
              Summary :{" "}
              <span className="font-weight-bold">
                {"This trip takes 28mins to reach"}{" "}
              </span>
            </p>
            <Button variant="success">See what's interesting</Button>
          </div>
        ) : null}
        {this.state.showGreaterThanTwoIsOpen ? (
          <div>
            <p className=" text-primary font-weight-bold">Public Transport</p>
            <p className="text-secondary">
              Distance : <span className="font-weight-bold">{"22 km"}</span>
            </p>
            <p className="text-secondary">
              TravelTime :
              <span className="font-weight-bold">:{"40 mins "}</span>
            </p>
            <p className="text-secondary">
              Summary :{" "}
              <span className="font-weight-bold">
                {"This trip takes 40mins to reach"}
              </span>
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}
DifferentWaysOfTransportModalMap.contextType = UserSearchContext;
export default DifferentWaysOfTransportModalMap;

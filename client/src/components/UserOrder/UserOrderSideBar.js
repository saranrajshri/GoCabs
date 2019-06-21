import React from "react";

import axios from "axios";

import { Button, Row, Col } from "react-bootstrap";

import UserOrderContext from "./UserOrderContext";

class UserOrderSideBar extends React.Component {
  constructor() {
    super();
    this.state = {
      driverData: [],
      file: null
    };
  }
  onFormSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myImage", this.state.file);

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post(
        "http://localhost:8000/upload",

        formData,
        config
      )
      .then(response => {
        axios.post("http://localhost:8000/api/order/updateLandmarkpic", {});
        alert("The file is successfully uploaded");
      })
      .catch(error => {});
  };
  onChange = e => {
    this.setState({ file: e.target.files[0] });
  };
  render() {
    return (
      <div className="p-2">
        <h6 className="text-success font-weight-bold mt-2 mb-2">
          Order placed..! The Driver Will reach you soon
        </h6>
        <div className="border border-muted p-2">
          <h6 className="text-primary font-weight-bold">Driver Details</h6>
          <p className="text-secondary mt-3 small">
            Driver Name: <span className="font-weight-bold">Saranraj</span>
          </p>
          <p className="text-secondary small">
            Vechile Number: <span className="font-weight-bold">ABC123</span>
          </p>
          <p className="text-secondary small">
            Vechile Model Name:{" "}
            <span className="font-weight-bold small">Hundai i10</span>
          </p>
          <p className="text-secondary small">
            Driver Current Location:{" "}
            <span className="font-weight-bold">Reliance Coporate Park</span>
          </p>
        </div>
        <div className="mt-2 border border-muted p-2">
          <h6 className="text-primary font-weight-bold">Route Details</h6>
          <p className="text-secondary mt-3 small">
            From:{" "}
            <span className="font-weight-bold">
              {this.context.orderDetails.originTitle}
            </span>
          </p>{" "}
          <p className="text-secondary mt-3 small">
            To:{" "}
            <span className="font-weight-bold">
              {this.context.orderDetails.destinationTitle}
            </span>
          </p>
          <p className="small text-secondary mt-3">
            Distance: <span className="font-weight-bold">32km</span>
          </p>
          <p className="small text-secondary mt-3">
            Estimated Time: <span className="font-weight-bold">70mins</span>
          </p>
          <div className="border border-muted p-2">
            <form onSubmit={this.onFormSubmit}>
              <h1 className="text-primary small font-weight-bold">
                Upload Nearby Landmark pic
              </h1>
              <Row>
                <Col>
                  <input
                    type="file"
                    name="myImage"
                    onChange={this.onChange}
                    className="m-2"
                  />
                </Col>
                <Col>
                  <button type="submit" className="btn btn-danger btn-small">
                    Upload
                  </button>
                </Col>
              </Row>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
UserOrderSideBar.contextType = UserOrderContext;
export default UserOrderSideBar;

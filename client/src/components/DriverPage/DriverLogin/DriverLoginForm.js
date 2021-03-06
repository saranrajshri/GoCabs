import React from "react";

// axios
import axios from "axios";

// importing context
import DriverLoginContext from "./DriverLoginContext";

// Bootstrap Components
import { Form, Button } from "react-bootstrap";

class DriverLoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      driverLat: "",
      driverLon: ""
    };
  }
  // update State
  updateState = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  login = () => {
    axios
      .post("http://localhost:8000/api/driver/loginDriver", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        this.context.updateDriverData(res.data);
        axios.put("http://localhost:8000/api/driver/updateDriverLocation", {
          driverID: this.context.driverData.id,
          location: {
            coordinates: [this.state.driverLat, this.state.driverLon]
          }
        });
        window.location = "/driver/dashboard";
      });
  };

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  showPosition = position => {
    this.setState({
      driverLat: position.coords.latitude,
      driverLon: position.coords.longitude
    });
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    return (
      <div className="bg-white rounded p-3">
        <h5 className="font-weight-bold  text-secondary">
          Login into your driver account
        </h5>
        <hr />
        <div>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="text-secondary font-weight-bold small">
                EMAIL ADDRESS
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={this.updateState}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text-secondary font-weight-bold small">
                PASSWORD
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.updateState}
              />
            </Form.Group>
            <Button variant="warning" onClick={this.login}>
              Login
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
DriverLoginForm.contextType = DriverLoginContext;
export default DriverLoginForm;

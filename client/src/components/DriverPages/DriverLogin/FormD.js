import React from "react";

import { FormControl, Form, Row, Col } from "react-bootstrap";
import "../DriverLogin/Driver.css";
class FormD extends React.Component {
  render() {
    return (
      <div>
        <Form>
          <Form.Row>
            <div className="col-xs-6 row row-bottom-margin">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>
            </div>

            <div className="col-xs-6">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </div>
          </Form.Row>
        </Form>
      </div>
    );
  }
}
export default FormD;

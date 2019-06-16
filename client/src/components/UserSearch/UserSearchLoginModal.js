import React from "react";
// Bootstrap Components
import { Modal, Button, Form } from "react-bootstrap";

class UserSearchLoginModal extends React.Component {
  constructor() {
    super();
    this.state = {
      loginFormIsOpen: true,
      registerFormIsOpen: false
    };
  }

  showRegisterForm = () => {
    this.setState({
      loginFormIsOpen: false,
      registerFormIsOpen: true
    });
  };

  showLoginForm = () => {
    this.setState({
      registerFormIsOpen: false,
      loginFormIsOpen: true
    });
  };
  render() {
    if (this.props.isOpen) {
      return (
        <div>
          <Modal show={this.props.isOpen} onHide={this.props.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {this.state.loginFormIsOpen
                  ? "Oops..! You forgot to login"
                  : "Create an account"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.state.loginFormIsOpen ? (
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="text-secondary small font-weight-bold">
                      EMAIL ADDRESS
                    </Form.Label>
                    <Form.Control type="email" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label className="text-secondary small font-weight-bold">
                      PASSWORD
                    </Form.Label>
                    <Form.Control type="password" />
                  </Form.Group>
                  <Form.Group controlId="formBasicChecbox">
                    <Form.Check
                      type="checkbox"
                      label="Remember Me"
                      className="text-secondary"
                    />
                  </Form.Group>
                  <Button variant="danger">Login</Button>
                </Form>
              ) : (
                <Form>
                  <Form.Group controlId="formBasicName">
                    <Form.Label className="text-secondary small font-weight-bold">
                      USERNAME
                    </Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="text-secondary small font-weight-bold">
                      EMAIL ADDRESS
                    </Form.Label>
                    <Form.Control type="email" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label className="text-secondary small font-weight-bold">
                      PASSWORD
                    </Form.Label>
                    <Form.Control type="password" />
                  </Form.Group>

                  <Button variant="danger">Login</Button>
                </Form>
              )}
            </Modal.Body>
            <Modal.Footer>
              {this.state.loginFormIsOpen ? (
                <p className="text-secondary ">
                  Dont have an account ?{" "}
                  <button
                    className="btn btn-link text-decoration-none font-weight-bold"
                    onClick={this.showRegisterForm}
                  >
                    Register
                  </button>
                </p>
              ) : (
                <p className="text-secondary ">
                  Already an user ?{" "}
                  <button
                    className="btn btn-link text-decoration-none font-weight-bold"
                    onClick={this.showLoginForm}
                  >
                    Login
                  </button>
                </p>
              )}
            </Modal.Footer>
          </Modal>
        </div>
      );
    } else {
      return null;
    }
  }
}
export default UserSearchLoginModal;

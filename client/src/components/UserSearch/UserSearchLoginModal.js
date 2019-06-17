import React from "react";

// importing context
import UserContext from "./UserSearchContext";

// axios
import axios from "axios";

// Bootstrap Components
import { Modal, Button, Form } from "react-bootstrap";

class UserSearchLoginModal extends React.Component {
  constructor() {
    super();
    this.state = {
      loginFormIsOpen: true,
      registerFormIsOpen: false,
      username: "",
      email: "",
      password: "",
      emailError: "",
      userNameError: "",
      passwordError: "",
      loginEmail: "",
      loginPassword: "",
      loginError: ""
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

  // update State on change
  updateState = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // send data to route
  createAccount = () => {
    this.setState({
      userNameError: "",
      emailError: "",
      passwordError: ""
    });
    if (
      this.state.username !== "" &&
      this.state.email !== "" &&
      this.state.password !== ""
    ) {
      if (this.state.email.indexOf("@") !== -1) {
        axios
          .post("http://localhost:8000/api/user/addUser", {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
          })
          .then(res => {
            // login the user after creating account
            axios
              .post("http://localhost:8000/api/user/loginUser", {
                email: this.state.email,
                password: this.state.password
              })
              .then(res => {
                this.context.updateUserData(res.data);
                this.props.handleClose();
              })
              .catch(err => {
                console.log(err);
              });
            // login end
          })
          .catch(err => {
            if (err.response) {
              if (err.response.status === 401) {
                this.setState({
                  emailError: "Email already exists"
                });
              }
            }
          });
      } else {
        this.setState({
          emailError: "Enter a valid email"
        });
      }
    } else if (this.state.username === "") {
      this.setState({
        userNameError: "Enter username"
      });
    } else if (this.state.email === "") {
      this.setState({
        emailError: "Enter your email"
      });
    } else if (this.state.password === "") {
      this.setState({
        passwordError: "Enter your password"
      });
    }
  };

  // update login form state
  updateLoginState = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // login
  login = () => {
    axios
      .post("http://localhost:8000/api/user/loginUser", {
        email: this.state.loginEmail,
        password: this.state.loginPassword
      })
      .then(res => {
        this.context.updateUserData(res.data);
        this.props.handleClose();
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 404) {
            this.setState({
              loginError: "No users found"
            });
          } else if (err.response.status === 401) {
            this.setState({
              loginError: "Wrong information"
            });
          }
        }
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
                    <Form.Control
                      type="email"
                      name="loginEmail"
                      onChange={this.updateLoginState}
                    />
                    <Form.Text className="text-danger">
                      {this.state.loginError}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label className="text-secondary small font-weight-bold">
                      PASSWORD
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="loginPassword"
                      onChange={this.updateLoginState}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicChecbox">
                    <Form.Check
                      type="checkbox"
                      label="Remember Me"
                      className="text-secondary"
                    />
                  </Form.Group>
                  <Button variant="danger" onClick={this.login}>
                    Login
                  </Button>
                </Form>
              ) : (
                <Form>
                  <Form.Group controlId="formBasicName">
                    <Form.Label className="text-secondary small font-weight-bold">
                      USERNAME
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onChange={this.updateState}
                      name="username"
                    />
                    <Form.Text className="text-danger">
                      {this.state.userNameError}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="text-secondary small font-weight-bold">
                      EMAIL ADDRESS
                    </Form.Label>
                    <Form.Control
                      type="email"
                      onChange={this.updateState}
                      name="email"
                    />
                    <Form.Text className="text-danger">
                      {this.state.emailError}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label className="text-secondary small font-weight-bold">
                      PASSWORD
                    </Form.Label>
                    <Form.Control
                      type="password"
                      onChange={this.updateState}
                      name="password"
                    />
                    <Form.Text className="text-danger">
                      {this.state.passwordError}
                    </Form.Text>
                  </Form.Group>
                  <Button variant="danger" onClick={this.createAccount}>
                    Signup
                  </Button>
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
UserSearchLoginModal.contextType = UserContext;
export default UserSearchLoginModal;

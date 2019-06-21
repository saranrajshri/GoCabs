import React from "react";
// importing context
import UserSearchContext from "./UserSearchContext";

// Bootstrap Components
import { Modal, Button } from "react-bootstrap";

// axios
import axios from "axios";

var result;
class UserSearchDriversModal extends React.Component {
  chekForConfirmed = () => {
    axios
      .post("http://localhost:8000/api/user/getUserDetails", {
        userid: this.context.userData.id
      })
      .then(response => {
        if (response.data[0] !== undefined) {
          console.log(response.data[0]);
          result = response.data[0].orderAccepted;
          if (result === "yes") {
            window.location = "/user/order/";
          }
        }
      });
  };
  componentDidMount() {
    this.interval = setInterval(() => {
      this.chekForConfirmed();
    }, 1000);
  }
  render() {
    if (this.props.isOpen) {
      return (
        <div>
          <Modal show={this.props.isOpen} onHide={this.props.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Searching For Drivers</Modal.Title>
            </Modal.Header>
            <Modal.Body />
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  this.props.handleClose();
                  this.context.deleteDataFromDB();
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    } else {
      return null;
    }
  }
}
UserSearchDriversModal.contextType = UserSearchContext;
export default UserSearchDriversModal;

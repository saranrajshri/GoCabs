import React from "react";
// importing context
import UserSearchContext from "./UserSearchContext";

// Bootstrap Components
import { Modal, Button } from "react-bootstrap";

class UserSearchDriversModal extends React.Component {
  render() {
    if (this.props.isOpen) {
      return (
        <div>
          <Modal show={this.props.isOpen} onHide={this.props.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Searching For Drivers</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.props.handleClose}>
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

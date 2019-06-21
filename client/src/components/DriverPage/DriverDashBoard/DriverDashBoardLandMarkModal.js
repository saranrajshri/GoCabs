import React from "react";
// importing context

// Bootstrap Components
import { Modal, Button, Image } from "react-bootstrap";

// axios

var result;
class DriverDashBoardLandMarkModal extends React.Component {
  render() {
    if (this.props.isOpen) {
      return (
        <div>
          <Modal show={this.props.isOpen} onHide={this.props.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Showing Customer LandMark Pic</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Image src="../../uploads/x.jpg" className="w-100" />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  this.props.handleClose();
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
export default DriverDashBoardLandMarkModal;

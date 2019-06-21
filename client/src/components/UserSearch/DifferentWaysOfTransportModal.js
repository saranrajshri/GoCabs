import React from "react";

// Bootstrap Components
import { Modal, Button } from "react-bootstrap";

import DifferentWaysOfTransportModalMap from "./DifferentWaysOfTransportModalMap";
class DifferentWaysOfTransportModal extends React.Component {
  render() {
    return (
      <div>
        <Modal show={this.props.isOpen} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Select the number of passengers</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-2">
            <DifferentWaysOfTransportModalMap />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="warning"
              onClick={() => {
                this.props.handleClose();
                this.props.showDriversModal();
              }}
            >
              No,I'm okay with cabs
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default DifferentWaysOfTransportModal;

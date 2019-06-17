import React from "react";

import { Row } from "react-bootstrap";
class DriverDashBoardSideBar extends React.Component {
  render() {
    return (
      <div className="p-2 ml-3">
        <Row>
          <h6>
            GoCabs <span className="small">drivers</span>
          </h6>
        </Row>
      </div>
    );
  }
}
export default DriverDashBoardSideBar;

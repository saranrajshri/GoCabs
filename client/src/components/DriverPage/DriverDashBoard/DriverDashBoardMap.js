import React from "react";
class DriverDashBoardMap extends React.Component {
  render() {
    return (
      <div>
        <iframe
          src="/maps/showRoute.html"
          style={{ width: "100%", height: "550px" }}
        />
      </div>
    );
  }
}
export default DriverDashBoardMap;

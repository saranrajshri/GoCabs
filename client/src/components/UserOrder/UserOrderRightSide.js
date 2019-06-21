import React from "react";
import UserOrderContext from "./UserOrderContext";

class UserOrderRightSide extends React.Component {
  render() {
    // console.log(this.context.orderDetails);
    const url =
      "/maps/showRoute.html?" +
      "originLat=" +
      this.context.orderDetails.originLat +
      "&" +
      "originLon=" +
      this.context.orderDetails.originLon +
      "&" +
      "originIcon=" +
      this.context.orderDetails.originIcon +
      "&" +
      "destinationLat=" +
      this.context.orderDetails.destinationLat +
      "&" +
      "destinationLon=" +
      this.context.orderDetails.destinationLon +
      "&" +
      "destinationIcon=" +
      this.context.orderDetails.destinationIcon;
    console.log(url);
    return (
      <div>
        <iframe
          src={url}
          title="hello"
          className="w-100"
          style={{ height: "600px", border: "none" }}
        />
      </div>
    );
  }
}
UserOrderRightSide.contextType = UserOrderContext;
export default UserOrderRightSide;

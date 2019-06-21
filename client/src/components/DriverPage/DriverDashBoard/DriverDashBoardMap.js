import React from "react";

import DriverDashBoardContext from "./DriverDashBoardContext";

var url;
class DriverDashBoardMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: "",
      lon: ""
    };
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  showPosition = position => {
    this.setState({
      lat: position.coords.latitude,
      lon: position.coords.longitude
    });
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    if (this.props.showRouteToCustomer === true) {
      if (this.props.orderData !== undefined) {
        url =
          "/maps/showRoute.html?" +
          "originLat=" +
          this.state.lat +
          "&" +
          "originLon=" +
          this.state.lon +
          "&" +
          "originIcon=" +
          "https://img.icons8.com/color/48/000000/marker.png" +
          "&" +
          "destinationLat=" +
          this.props.orderData.originLat +
          "&" +
          "destinationLon=" +
          this.props.orderData.originLon +
          "&" +
          "destinationIcon=" +
          " " +
          "&";
      }
      // console.log(url)
    } else {
      //  showlocationurl
      if (this.props.orderData !== undefined) {
        url =
          "/maps/showRoute.html?" +
          "originLat=" +
          this.props.orderData.originLat +
          "&" +
          "originLon=" +
          this.props.orderData.originLon +
          "&" +
          "originIcon=" +
          "https://img.icons8.com/color/48/000000/marker.png" +
          "&" +
          "destinationLat=" +
          this.props.orderData.destinationLat +
          "&" +
          "destinationLon=" +
          this.props.orderData.destinationLon +
          "&" +
          "destinationIcon=" +
          " " +
          "&";
        // console.log(url)
      }
    }

    console.log(url);
    return (
      <div>
        {this.props.showRouteToCustomer === true ? (
          <h6 className="text-primary">Showing route to customer location</h6>
        ) : (
          <h6 className="text-primary">Showing route to destination</h6>
        )}
        <iframe
          title="map"
          src={url}
          style={{ width: "100%", height: "550px", border: "none " }}
        />
      </div>
    );
  }
}
DriverDashBoardMap.contextType = DriverDashBoardContext;
export default DriverDashBoardMap;

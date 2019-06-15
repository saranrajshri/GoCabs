import React from "react";

//Components
import UserSearchContext from "./UserSearchContext";

// importing Axios
import axios from "axios";

// variables that are used inside for conditional rendering
var baseURL, searchLat, searchLon, searchIcon;

class UserSearchMap extends React.Component {
  render() {
    if (
      this.context.originData.originLat &&
      this.context.originData.originLon &&
      this.context.destinationData.destinationLat === undefined &&
      this.context.destinationData.destinationLon === undefined
    ) {
      searchLat = this.context.originData.originLat;
      searchLon = this.context.originData.originLon;
      searchIcon = this.context.originData.originIcon;
    } else {
      searchLat = this.context.destinationData.destinationLat;
      searchLon = this.context.destinationData.destinationLon;
      searchIcon = this.context.destinationData.destinationIcon;
    }
    if (
      this.context.originData.originLat &&
      this.context.originData.originLon &&
      this.context.destinationData.destinationLat &&
      this.context.destinationData.destinationLon
    ) {
      // if both data exists render showRoute Page else show search page
      baseURL = "maps/showRoute.html?";
      axios
        .get(
          "https://route.api.here.com/routing/7.2/calculateroute.json?app_id=vjy6uZJ1g8cBFrsFC8qX&app_code=JDE3TVLeWDjefVi30qzdaw&waypoint0=" +
            this.context.originData.originLat +
            "," +
            this.context.originData.originLon +
            "&waypoint1=" +
            this.context.destinationData.destinationLat +
            "," +
            this.context.destinationData.destinationLon +
            "&mode=fastest;car;traffic:disabled"
        )
        .then(res => {
          var data = {
            instructions: res.data.response.route[0].leg[0].maneuver,
            distance: res.data.response.route[0].summary.distance,
            travelTime: res.data.response.route[0].summary.travelTime
          };
          // console.log(res.data.response.route[0]);

          // sending data to UserSearchIndex
          this.props.updateRouteSummary(data);
        });
    } else {
      baseURL = "maps/search.html?";
    }
    // Url for the ma.Sending data in the url
    const url =
      baseURL +
      "originLat=" +
      this.context.originData.originLat +
      "&" +
      "originLon=" +
      this.context.originData.originLon +
      "&" +
      "originIcon=" +
      this.context.originData.originIcon +
      "&" +
      "destinationLat=" +
      this.context.destinationData.destinationLat +
      "&" +
      "destinationLon=" +
      this.context.destinationData.destinationLon +
      "&" +
      "destinationIcon=" +
      this.context.destinationData.destinationIcon +
      "&" +
      "searchLat=" +
      searchLat +
      "&" +
      "searchLon=" +
      searchLon +
      "&" +
      "searchIcon=" +
      searchIcon;
    // console.log(url);
    return (
      <div className="mt-1">
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
UserSearchMap.contextType = UserSearchContext;
export default UserSearchMap;

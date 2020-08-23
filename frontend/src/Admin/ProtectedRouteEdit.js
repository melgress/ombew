import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import EditEssen from "./EditEssen";

class ProtectedRouteEdit extends Component {
  render() {
    //const Component = this.props.component;
    const isAuthenticated = localStorage.getItem("token");
    return isAuthenticated ? (
      <Route
        path="/EditEssen/:id"
        render={(props) => <EditEssen {...props} />}
      />
    ) : (
      <Redirect to={{ pathname: "/EssenDetail" }} />
    );
  }
}

export default ProtectedRouteEdit;

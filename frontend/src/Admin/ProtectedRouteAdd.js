import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AddEssen from "./AddEssen";

class ProtectedRouteAdd extends Component {
  render() {
    //const Component = this.props.component;
    const isAuthenticated = localStorage.getItem("token");

    return isAuthenticated ? (
      <AddEssen />
    ) : (
      <Redirect to={{ pathname: "/EssenDetail" }} />
    );
  }
}

export default ProtectedRouteAdd;

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import EssenDetailAdmin from "./EssenDetailAdmin";

class ProtectedRouteEssen extends Component {
  render() {
    //const Component = this.props.component;
    const isAuthenticated = localStorage.getItem("token");

    return isAuthenticated ? (
      <EssenDetailAdmin />
    ) : (
      <Redirect to={{ pathname: "/EssenDetail" }} />
    );
  }
}

export default ProtectedRouteEssen;

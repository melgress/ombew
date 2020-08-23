import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import EssensplanAdmin from "./EssensplanAdmin";

class ProtectedRouteEssenplan extends Component {
  render() {
    //const Component = this.props.component;
    const isAuthenticated = localStorage.getItem("token");

    return isAuthenticated ? (
      <EssensplanAdmin />
    ) : (
      <Redirect to={{ pathname: "/Essensplan" }} />
    );
  }
}

export default ProtectedRouteEssenplan;

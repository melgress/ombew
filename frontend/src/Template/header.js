import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "./style.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="header">
        <div className="container">
          <div className="logo">
            <NavLink to="/">Logo</NavLink>
          </div>
          <div className="navbar">
            <ul>
              <li>
                <NavLink to="/" exact activeStyle={{ color: "#2a6496" }}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/EssensplanAdmin"
                  exact
                  activeStyle={{ color: "#2a6496" }}
                >
                  Essensplan
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/EssenDetailAdmin"
                  exact
                  activeStyle={{ color: "#2a6496" }}
                >
                  Essen Details
                </NavLink>
              </li>
              <li>
                <NavLink to="/SignUp" exact activeStyle={{ color: "#2a6496" }}>
                  Sign up
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/LoginTest"
                  exact
                  activeStyle={{ color: "#2a6496" }}
                >
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;

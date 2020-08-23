import React, { Component } from "react";
//import AuthService from "./AuthService";
import "./style.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <h1>Home</h1>
        <div>
          <div className="col-6"></div>
        </div>
      </div>
    );
  }
}

export default Home;

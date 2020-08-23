import React, { Component } from "react";
//import decode from "jwt-decode";
//import { useAuth } from "./Auth";

export default class LoginTest extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    //  this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      //isLoggedIn: false,
      // credentials: {
      //  id: "",
      username: "",
      password: "",
      token: "",
      //},
    };
  }

  componentDidMount() {}

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  async handleLogin() {
    //const token = localStorage.getItem("jwttoken");
    fetch("http://localhost:9000/api/login", {
      method: "POST",
      headers: {
        //  Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        //msg: "",
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))

      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            required
            onChange={this.onChangeUsername}
            name="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Passwort</label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            onChange={this.onChangePassword}
            name="password"
          />
        </div>
        <button onClick={this.handleLogin} className="btn btn-success">
          Login
        </button>
      </div>
    );
  }
}

import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import EssensplanAdmin from "./Admin/EssensplanAdmin";
import EssensplanUser from "./User/EssensplanUser";
import EssenDetailAdmin from "./Admin/EssenDetailAdmin";
import AddEssen from "./Admin/AddEssen";
import EditEssen from "./Admin/EditEssen";
import SignUp from "./SignUp";
import LoginTest from "./LoginTest";
import ProtectedRouteEssen from "./Admin/ProtectedRouteEssen";
import ProtectedRouteEssenplan from "./Admin/ProtectedRouteEssenplan";
import ProtectedRouteAdd from "./Admin/ProtectedRouteAdd";
import ProtectedRouteEdit from "./Admin/ProtectedRouteEdit";
import EssenDetailUser from "./User/EssenDetailUser";
//import AuthService from "./AuthService";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      token: "",
      isLoggedIn: Boolean,
    };
  }

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

  handleLogin() {
    //console.log(this.props.history);
    fetch("http://localhost:9000/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        const token = response.token;
        this.setState({
          token: token,
        });
        localStorage.setItem("token", this.state.token);
        if (token != null)
          this.setState({
            isLoggedIn: true,
          });
        // history.push("/EssenDetailAdmin");
        console.log("Eingeloggt");
      })

      .catch((err) => console.log(err));
  }

  handleLogout() {
    localStorage.removeItem("token");
    this.setState({
      isLoggedIn: false,
    });
    console.log("Ausgeloggt");
  }
  //ToDO: /EditEssen muss eine protected Route sein  (so wie bei AddEssen) sonst, kann jeder (auch nicht eingeloggte User)
  //über die URL Essen ändern. Problem "props" werden nicht richtig übergeben
  render() {
    return (
      <Router>
        <div>
          <Header
            isLoggedIn={this.state.isLoggedIn}
            handleLogout={this.handleLogout.bind(this)}
          />
          <div className="wrapper">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <ProtectedRouteEssenplan path="/EssensplanAdmin">
                <EssensplanAdmin />
              </ProtectedRouteEssenplan>
              <Route exact path="/Essensplan">
                <EssensplanUser />
              </Route>
              <ProtectedRouteEssen path="/EssenDetailAdmin">
                <EssenDetailAdmin />
              </ProtectedRouteEssen>
              <Route exact path="/EssenDetail">
                <EssenDetailUser />
              </Route>
              <ProtectedRouteAdd path="/AddEssen">
                <AddEssen />
              </ProtectedRouteAdd>
              <Route path="/SignUp">
                <SignUp />
              </Route>
              <Route path="/LoginTest">
                <LoginTest
                  handleLogin={this.handleLogin.bind(this)}
                  handleLogout={this.handleLogout.bind(this)}
                  onChangeUsername={this.onChangeUsername.bind(this)}
                  onChangePassword={this.onChangePassword.bind(this)}
                  isLoggedIn={this.state.isLoggedIn}
                />
              </Route>
              <ProtectedRouteEdit
                path="/EditEssen/:id"
                render={(props) => <EditEssen {...props} />}
              />
              <ProtectedRouteEdit />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById("root"));
//export default withRouter(App);

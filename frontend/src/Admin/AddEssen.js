import React, { Component } from "react";
//import { Table, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

//Hier muss nach dem hinzufügen wieder zur EssenDetail Seite weitergeleitet werden
export default class AddEssen extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      newEssen: {
        id: null,
        name: "",
        price: "",
        description: "",
        submitted: false,
      },
    };
  }

  componentDidMount() {}
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  handleSubmit() {
    //essen.preventDefault();
    fetch("http://localhost:9000/api/addEssen", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        price: this.state.price,
        description: this.state.description,
        submitted: true,
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
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            //value={this.state.name}
            onChange={this.onChangeName}
            name="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Preis</label>
          <input
            type="number"
            className="form-control"
            id="preis"
            required
            // value={this.state.price}
            onChange={this.onChangePrice}
            name="price"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            required
            // value={this.state.description}
            onChange={this.onChangeDescription}
            name="description"
          />
        </div>
        <Link to="/EssenDetailAdmin">
          <button onClick={this.handleSubmit} className="btn btn-success">
            Submit
          </button>
        </Link>
      </div>
    );
  }
}

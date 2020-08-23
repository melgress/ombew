import React, { Component } from "react";
//import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default class EditEssen extends Component {
  constructor(props) {
    super(props);

    this.onChangeEssenName = this.onChangeEssenName.bind(this);
    this.onChangeEssenPrice = this.onChangeEssenPrice.bind(this);
    this.onChangeEssenDescription = this.onChangeEssenDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      currentEssen: [],
      essen: {
        name: "",
        price: null,
        description: "",
      },
    };
  }

  componentDidMount() {
    fetch("http://localhost:9000/api/essen/" + this.props.match.params.id)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          currentEssen: data,
        })
      );
  }

  onChangeEssenName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeEssenPrice(e) {
    this.setState({ price: e.target.value });
  }

  onChangeEssenDescription(e) {
    this.setState({ description: e.target.value });
  }

  onSubmit() {
    //e.preventDefault();
    fetch("http://localhost:9000/api/essen/" + this.props.match.params.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        price: this.state.price,
        description: this.state.description,
      }),
    })
      .then((res) => res.json())
      .catch((error) => {
        throw error;
      });

    console.log("Edited");
  }

  //Hier müssen noch Name, Preis und Beschreibung des zu bearbeitenden Essens mitgegeben werden, evtl. über value
  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          {this.state.currentEssen.map((essen) => (
            <input
              key={essen.id}
              type="text"
              className="form-control"
              id="name"
              defaultValue={essen.name}
              onChange={this.onChangeEssenName}
              name="name"
            />
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="price">Preis</label>
          {this.state.currentEssen.map((essen) => (
            <input
              key={essen.id}
              type="number"
              min="0"
              step="1"
              className="form-control"
              id="preis"
              defaultValue={essen.price}
              onChange={this.onChangeEssenPrice}
              name="price"
            />
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          {this.state.currentEssen.map((essen) => (
            <input
              key={essen.id}
              type="text"
              className="form-control"
              id="description"
              defaultValue={essen.description}
              onChange={this.onChangeEssenDescription}
              name="description"
            />
          ))}
        </div>
        <Link to="/EssenDetailAdmin">
          <Button
            variant="danger"
            type="submit"
            onClick={() => this.onSubmit()}
          >
            Update Essen
          </Button>
        </Link>
      </div>
    );
  }
}

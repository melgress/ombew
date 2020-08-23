import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class EssenDetailAdmin extends Component {
  constructor(props) {
    super(props);
    this._essenLöschen = this._essenLöschen.bind(this);

    this.state = {
      essenListe: [],

      response: {},
    };
  }

  componentDidMount() {
    fetch("http://localhost:9000/api/essen")
      .then((response) => response.json())
      .then((essen) => {
        this.setState({ essenListe: essen });
      });
  }

  _essenLöschen(id) {
    const { essenListe } = this.state;
    fetch("http://localhost:9000/api/essen/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        this.setState({
          essenListe: essenListe.filter((essen) => essen.id !== id),
        });
        return;
      })
      .catch((error) => {
        throw error;
      });
    //    essen.preventDefault();

    console.log("Deleted");
  }

  render() {
    return (
      <div>
        <div>
          <Link className="create-link" to={"/AddEssen"}>
            <Button>Add</Button>
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Preis</th>
              <th>Beschreibung</th>
            </tr>
          </thead>
          <tbody>
            {this.state.essenListe.map((essen) => (
              <tr key={essen.id}>
                <td>{essen.name} </td>
                <td>{essen.price}</td>
                <td> {essen.description}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => this._essenLöschen(essen.id)}
                  >
                    Delete
                  </Button>
                </td>

                <td>
                  <Link className="edit-link" to={"/EditEssen/" + essen.id}>
                    <Button>Edit</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

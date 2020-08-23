import React, { Component } from "react";

export default class EssenDetailUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      essenListe: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:9000/api/essen")
      .then((response) => response.json())
      .then((essen) => {
        this.setState({ essenListe: essen });
      });
  }

  render() {
    return (
      <div>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

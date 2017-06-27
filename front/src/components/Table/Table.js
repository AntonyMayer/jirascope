import React, { Component } from 'react';
import './Table.css';

var data = ['Loading...'];

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  componentDidMount() {
    this.updateInfo();
    // setInterval(this.updateInfo.bind(this), 5000);
  }

  updateInfo() {
    this.props.widget()
      .then(res => {
        return res.json();
      })
      .then(tickets => {
        // console.log(tickets.length);
        data = tickets.map((ticket) => {
            return <li key={ticket.key.toString()}>Key: {ticket.key}, Status: {ticket.fields.status.name}</li>;
        });
        this.setState({ date: new Date() });
      });
  }

  render() {
    return (
      <div className="lorem">
        <h1>{this.props.name}</h1>
        {data}
      </div>
    );
  }
}

export default Table;

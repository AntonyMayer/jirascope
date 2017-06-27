import React, { Component } from 'react';
import './Tables.css';

var data = ['loading'];

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  componentDidMount() {
    fetch('/api/tickets?status=open')
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
        <h1>Current projects</h1>
        {data}
      </div>
    );
  }
}

export default Tables;

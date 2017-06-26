import React, { Component } from 'react';
import './Tables.css';

class Tables extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/tickets')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="b_table">
        <h1>Current projects</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>
    );
  }
}

export default Tables;

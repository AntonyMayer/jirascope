import React, { Component } from 'react';
import Table from '../Table/Table';
import './Page.css';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

//   componentDidMount() {
    
//   }

  render() {
    return (
      <div>
          <Table data='inProgress' />
          <Table data='open' />
      </div>
    );
  }
}

export default Page;

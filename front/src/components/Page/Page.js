import React, { Component } from 'react';
//components
import Table from '../Table/Table';

//widgets
import ticketsByProject from '../../widgets/ticketsByProject';

//css
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
          <Table name='Status: Open, Reopen' widget={ticketsByProject}/>
      </div>
    );
  }
}

export default Page;

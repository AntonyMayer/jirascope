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
          <Table data='inProgress' name='Status: Open, Reopen' widget={ticketsByProject}/>
          {/*<Table data='open' name='Status: Open, Reopen' />*/}
      </div>
    );
  }
}

export default Page;

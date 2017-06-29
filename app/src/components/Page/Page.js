import React, { Component } from 'react';
// import Jirascope from '../../jirascope';

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

  // componentDidMount() {
  //   setInterval(_=>{
  //     console.log('Updateing....');
  //     this.setState({
  //       date: new Date()
  //     });
  //   }, 5000);
  // }

  render() {
    return (
      <div>
          <Table name='Tickets by project' widget={ticketsByProject}/>
      </div>
    );
  }
}

export default Page;

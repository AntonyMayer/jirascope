import React, { Component } from 'react';
import Jirascope from '../../jirascope';

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
      current: Jirascope.search.current
    };

    //listen to global updates
    this.watchGlobalState = this.watchGlobalState.bind(this);
    window.addEventListener('globalUpdate', this.watchGlobalState);
  }

  watchGlobalState() {
    this.setState({
      current: Jirascope.search.current
    });
    console.log(this.state);
  }

  render() {
    return (
      <div>
          <Table name='Tickets by project' widget={ticketsByProject}/>
      </div>
    );
  }
}

export default Page;

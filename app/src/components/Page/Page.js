//globals
import React, { Component } from 'react';
import Jirascope from '../../jirascope';

//components
import Table from '../Table/Table';
import TeamsFilter from '../Filters/Teams';

//widgets
import ticketsByProject from '../../widgets/ticketsByProject';
import ticketsByAssignee from '../../widgets/ticketsByAssignee';

//css
import './scss/Page.css';


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
  }

  render() {
    return (
      <div>
          <TeamsFilter />
          <Table widget={ticketsByProject} classModifier="projects"/> 
          <Table widget={ticketsByAssignee} classModifier="assignees"/>
      </div>
    );
  }
}

export default Page;

//globals
import React, { Component } from 'react';
import Jirascope from '../../jirascope';

//components
import Table from '../Table/Table';
import TeamsFilter from '../Filters/Teams';
import Graph from '../Graph/Graph';

//widgets (modules to process data)
import ticketsByProject from '../../widgets/ticketsByProject';
import ticketsByAssignee from '../../widgets/ticketsByAssignee';
import graphProjects from '../../widgets/graphProjects';

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

  componentDidMount() {
    Jirascope.updateLoop();
  }

  watchGlobalState() {
    this.setState({
      current: Jirascope.search.current
    });
  }

  render() {
    return (
      <div className="jirascope">
          {/* <TeamsFilter />
          <Table widget={ticketsByProject} classModifier="projects"/> 
          <Table widget={ticketsByAssignee} classModifier="assignees"/> */}
          <Graph widget={graphProjects} classModifier="projects"/>
      </div>
    );
  }
}

export default Page;

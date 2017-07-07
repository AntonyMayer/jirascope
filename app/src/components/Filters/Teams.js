import React, { Component } from 'react';
import Checkbox from './Checkbox';
import Jirascope from '../../jirascope';
import './Filters.css';

class TeamsFilter extends Component {
  constructor(props) {
    super(props);
    this.teams = document.getElementsByClassName('filter__checkbox--team');
    this.state = {
      date: new Date()
    };
    this.updateFilter = this.updateFilter.bind(this);
  }

  componentDidMount() {
    for (let i = 0, len = this.teams.length; i < len; i++) {
        if (localStorage.getItem(this.teams[i].id) === "true" ||
            localStorage.getItem(this.teams[i].id) === null) {
            this.teams[i].checked = true;
        }
    }
  }

  updateFilter() {
    let teamsArr = [];

    for (let i = 0, len = this.teams.length; i < len; i++) {
        if (this.teams[i].checked) {
            teamsArr = teamsArr.concat(Jirascope.teams[this.teams[i].id]);
            localStorage.setItem(this.teams[i].id, true);
        } else localStorage.setItem(this.teams[i].id, false);
    } 

    //avoid empty array
    if(!teamsArr.length) {
        for (var i = 0, len = this.teams.length; i < len; i++) {
            this.teams[i].checked = true;
            localStorage.setItem(this.teams[i].id, true);
        }  
        teamsArr = Jirascope.teams.dev.concat(Jirascope.teams.qa).concat(Jirascope.teams.cp);
    }

    Jirascope.updateAssigneeList(teamsArr);
  }

  render() {
    return (
        <div className="filter filter--tables">
            <p className="filter__title"><b>TEAMS</b> &#9658;</p>
            <div className="filter__update" onChange={this.updateFilter}>
                <Checkbox id="dev" group="team" />
                <Checkbox id="qa" group="team" />
                <Checkbox id="cp" group="team" />
            </div>
        </div>
    );
  }
}

export default TeamsFilter;

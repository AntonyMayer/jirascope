import React, { Component } from 'react';
import Checkbox from './Checkbox';
import Jirascope from '../../jirascope';
import './scss/Filters.css';

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
        teamsArr = [];
        for (var i = 0, len = this.teams.length; i < len; i++) {
            this.teams[i].checked = true;
            localStorage.setItem(this.teams[i].id, true);
        }  
        //concat all teams into one array to display all
        for (let team in Jirascope.teams) {
            teamsArr = teamsArr.concat(Jirascope.teams[team]);
        }
    }

    Jirascope.updateAssigneeList(teamsArr);
    Jirascope.getData();
  }

  render() {
    return (
        <div className="filter filter--tables">
            <p className="filter__title"><b>TEAMS</b> &#9658;</p>
            <div className="filter__update" onChange={this.updateFilter}>
                <Checkbox id="dev" group="team" />
                <Checkbox id="qa" group="team" />
                <Checkbox id="cp" group="team" />
                <Checkbox id="pm" group="team" />
            </div>
        </div>
    );
  }
}

export default TeamsFilter;

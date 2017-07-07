import React, { Component } from 'react';
import Jirascope from '../../jirascope';
import './Filters.css';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  updateFilter() {
    let teams = document.getElementsByClassName('filter__checkbox--team'),
        teamsArr = [];

    if (teams[0].checked) teamsArr = teamsArr.concat(Jirascope.teams.dev);
    if (teams[1].checked) teamsArr = teamsArr.concat(Jirascope.teams.qa);
    if (teams[2].checked) teamsArr = teamsArr.concat(Jirascope.teams.cp);

    if(!teamsArr.length) {
        teamsArr = Jirascope.teams.dev;
        teams[0].checked = true;
    }

    Jirascope.updateAssigneeList(teamsArr);
  }

  render() {
    return (
        <div className="filter filter--tables" onChange={this.updateFilter.bind(this)}>
            <div className="filter__trigger">
                <label htmlFor="dev" className="filter__label">DEV</label>
                <input id="dev" type="checkbox" className="filter__checkbox filter__checkbox--team"/>
            </div>
            <div className="filter__trigger">
                <label htmlFor="qa" className="filter__label" >QA</label>
                <input id="qa" type="checkbox" className="filter__checkbox filter__checkbox--team"/>
            </div>
            <div className="filter__trigger">
                <label htmlFor="cp" className="filter__label" >CP</label>
                <input id="cp" type="checkbox" className="filter__checkbox filter__checkbox--team"/>
            </div>
        </div>
    );
  }
}

export default Filter;

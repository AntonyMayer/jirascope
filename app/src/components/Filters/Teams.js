import React, { Component } from 'react';
import Jirascope from '../../jirascope';
import './Filters.css';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.teams = document.getElementsByClassName('filter__checkbox--team');
    this.state = {
      date: new Date()
    };
  }

  componentDidMount() {
    for (var i = 0, len = this.teams.length; i < len; i++) {
        if (localStorage.getItem(this.teams[i].id) === "true") {
            this.teams[i].checked = true;
        }
    }
  }

  updateFilter() {
    let teamsArr = [];

    for (var i = 0, len = this.teams.length; i < len; i++) {
        if (this.teams[i].checked) {
            teamsArr = teamsArr.concat(Jirascope.teams[this.teams[i].id]);
            localStorage.setItem(this.teams[i].id, true);
        } else localStorage.setItem(this.teams[i].id, false);
    } 

    //avoid empty array
    if(!teamsArr.length) {
        teamsArr = Jirascope.teams.dev;
        this.teams[0].checked = true;
        localStorage.setItem(this.teams[0].id, true);
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

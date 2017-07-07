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
    let teams = document.getElementsByClassName('filter__checkbox'),
        selected = {
            dev: teams[0].checked, 
            qa: teams[1].checked,
            cp: teams[2].checked
        };

    console.log(selected);
    // Jirascope.updateAssigneeList(Jirascope.teams.qa);
  }

  render() {
      /**
       * REDO ALL THAT STAFF BELOW AND ABOVE!!!
       * ADD ANOTHER COMPONENT => INPUT
       */
    return (
        <div className="filter filter--tables" onChange={this.updateFilter.bind(this)}>
            <div className="filter__trigger">
                <label htmlFor="dev" className="filter__label">DEV</label>
                <input id="dev" type="checkbox" className="filter__checkbox"/>
            </div>
            <div className="filter__trigger">
                <label htmlFor="qa" className="filter__label" >QA</label>
                <input id="qa" type="checkbox" className="filter__checkbox"/>
            </div>
            <div className="filter__trigger">
                <label htmlFor="cp" className="filter__label" >CP</label>
                <input id="cp" type="checkbox" className="filter__checkbox"/>
            </div>
        </div>
    );
  }
}

export default Filter;

import React, { Component } from 'react';
import Jirascope from '../../jirascope';
import './Filters.css';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
    // this.updateFilter = this.updateFilter.bind(this);
  }

  updateWidget() {
      this.props.updateWidget();
  }

  updateFilter(id) {
    //   let filterCheckbox = document.getElementById(id);
      Jirascope.updateAssigneeList(Jirascope.teams.qa);
    this.setState({ date: new Date() });
  }

  render() {
      /**
       * REDO ALL THAT STAFF BELOW AND ABOVE!!!
       * ADD ANOTHER COMPONENT => INPUT
       */
    return (
        <div className="filter filter--tables" onClick={this.updateWidget.bind(this)}>
            <div className="filter__trigger">
                <label htmlFor="dev" className="filter__label">DEV</label>
                <input id="dev" type="checkbox" checked onChange={this.updateFilter.bind(this, 'dev')} className="filter__checkbox"/>
            </div>
            <div className="filter__trigger">
                <label htmlFor="qa" className="filter__label" >QA</label>
                <input id="qa" type="checkbox" onChange={this.updateFilter.bind(this, 'qa')} className="filter__checkbox"/>
            </div>
            <div className="filter__trigger">
                <label htmlFor="cp" className="filter__label" >CP</label>
                <input id="cp" type="checkbox" onChange={this.updateFilter.bind(this, 'cp')} className="filter__checkbox"/>
            </div>
        </div>
    );
  }
}

export default Filter;

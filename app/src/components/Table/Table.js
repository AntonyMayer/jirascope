import React, { Component } from 'react';
import Jirascope from '../../jirascope';
import Row from './Row';
import './scss/Table.css';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: Jirascope.search.current,
      initial: true
    };
    this.selectors = {
      table: 'b_table',
      row: 'b_table__row',
      cell: 'b_table__cell',
      title: 'b_table__title'
    }
    this.data = [
      ['Loading...']
    ];
    /**
     * Data is a multidimensional array for building tables returned by this.udateInfo()
     * 
     * [
     *    [cell, cell, ..., cell],  //row
     *    [cell, cell, ..., cell],  //row
     *    [cell, cell, ..., cell],  //row
     *    ...
     *    [cell, cell, ..., cell]   //row
     * ]
     * 
     */
    this.updateInfo = this.updateInfo.bind(this);
  }

  componentDidMount() {
    this.updateInfo();
  }

  componentWillUpdate() {
    this.updateInfo();
  }
 
  updateInfo() {
    let tmpData = this.props.widget(Jirascope.data); //using widget module to proceed data and get an array
    this.data = tmpData.map((row, index) => {
        return (
          <Row data={row} selectors={this.selectors} rowIndex={index} key={row.toString()} />
        );
    });
  }

  render() {
    return (
      <div className="widget widget--table">
        <div className={`${this.selectors.table} ${this.selectors.table}--${this.props.classModifier}`}>
          {this.data}
        </div>
      </div>
    );
  }
}

export default Table;

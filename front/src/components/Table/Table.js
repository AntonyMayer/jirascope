import React, { Component } from 'react';
import Row from './Row';
import './Table.css';

var data = ['Loading...'];

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
    this.selectors = {
      table: 'b_table',
      row: 'b_table__row',
      cell: 'b_table__cell'
    }
  }

  componentDidMount() {
    this.updateInfo();
    // setInterval(this.updateInfo.bind(this), 5000);
  }

  updateInfo() {
    this.props.widget()
      .then(rows => {
        /**
         * Accepts multidimensional array
         * 
         * [
         *    [cell, cell, ..., cell],  //row
         *    [cell, cell, ..., cell],  //row
         *    [cell, cell, ..., cell],  //row
         *    ...
         *    [cell, cell, ..., cell]   //row
         * ]
         */
        data = rows.map((row, index) => {
            return (
                   <Row data={row} selectors={this.selectors} rowIndex={index} key={row.toString()}/>
            );
        });
        this.setState({ date: new Date() });
      });
  }

  render() {
    return (
      <div className="lorem">
        <h1>{this.props.name}</h1>
        <div className={this.selectors.table}>
          {data}
        </div>
      </div>
    );
  }
}

export default Table;

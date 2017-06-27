import React, { Component } from 'react';
import Cell from './Cell';
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
        data = rows.map(row => {
            return (
                <div className={this.selectors.row} key={row.toString()}>
                  <Cell data={row} class={this.selectors.cell} />
                </div>
            );
        });
        this.setState({ date: new Date() });
      });
  }

  render() {
    return (
      <div className="lorem">
        <h1>{this.props.name}</h1>
        <div className={this.selectors.row}>
          {data}
        </div>
      </div>
    );
  }
}

export default Table;

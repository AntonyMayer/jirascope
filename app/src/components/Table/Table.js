import React, { Component } from 'react';
import Row from './Row';
import Filters from '../Filters/Filters';
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
      cell: 'b_table__cell',
      title: 'b_table__title'
    }
  }

  componentDidMount() {
    this.updateInfo();
    setInterval(_=>{
      this.updateInfo();
    }, 5000);
  }

  test() {
    console.log('this');
  }

  updateInfo() {
    //using a passed method to get data
    console.log(`Updateing....${String(this.props.name).toUpperCase()}`);
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
        <h1 className={this.selectors.title} onClick={this.test}>{this.props.name}</h1>
        <Filters events={this.test} />
        <div className={this.selectors.table}>
          {data}
        </div>
      </div>
    );
  }
}

export default Table;

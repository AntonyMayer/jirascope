import React, { Component } from 'react';
import Jirascope from '../../jirascope';
import Row from './Row';
import './scss/Table.css';

var data = ['Loading...'];

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
    this.updateInfo = this.updateInfo.bind(this);
  }

  componentDidMount() {
    this.updateInfo().then( _ =>{
      this.setState({
        current: Jirascope.search.current,
        initial: false
      });
    });
  }

  componentDidUpdate() {
    setTimeout(_=>{
      //not "shallow" comparison of states
      if(this.state.current !== Jirascope.search.current) {
        this.updateInfo().then( _ =>{
          this.setState({
            current: Jirascope.search.current,
            initial: false
          });
        });   
      } 
    }, 100)
  }

  // componentDidUpdate() {}

  updateInfo() {
    //using a passed method to get data
    console.log(`Updateing....${String(this.props.name).toUpperCase()}`);
    return new Promise((resolve, reject) => {
      this.props.widget() //using module to proceed data
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
        resolve();
      });
    });
  }

  render() {
    return (
      <div className="widget widget--table">
        <div className={this.selectors.table}>
          {data}
        </div>
      </div>
    );
  }
}

export default Table;

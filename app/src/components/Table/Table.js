import React, { Component } from 'react';
import Jirascope from '../../jirascope';
import Row from './Row';
import Filters from '../Filters/Filters';
import './Table.css';

var data = ['Loading...'];

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: Jirascope.search.current
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
    this.updateInfo();
    console.log('mount');
  }
  componentWillUpdate() {
    console.log('will');
  }
  componentDidUpdate() {
    // this.updateInfo();
    console.log('did');    
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
        this.setState({
          current: Jirascope.search.current
        });
      });
  }

  render() {
    return (
      <div className="widget widget--table">
        <h1 className={this.selectors.title}>{this.props.name}</h1>
        <div >
          <Filters updateWidget={this.updateInfo} />
        </div>
        <div className={this.selectors.table}>
          {data}
        </div>
      </div>
    );
  }
}

export default Table;

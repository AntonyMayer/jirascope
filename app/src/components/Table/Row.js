import React, { Component } from 'react';

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
    //accepts array and builds rows for tables
    this.data = props.data.map((element, index) => {
        return (
            <div className={this.props.selectors.cell} key={(this.props.rowIndex + index).toString()}>
                {element}
            </div>
        );
    });
  }

  render() {
    return (
        <div className={this.props.selectors.row}>
            {this.data}
        </div>
    );
  }
}

export default Row;

import React, { Component } from 'react';

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
    //accepts array and builds rows for tables
    this.data = props.data.map((element, index) => {
        if (Number(element) < 1) {
            return (
                <div className={`${this.props.selectors.cell} ${this.props.selectors.cell}--zero`} key={(this.props.rowIndex + index).toString()}>
                    {element}
                </div>
            );
        } else if (Number(element) > 5) {
            return (
                <div className={`${this.props.selectors.cell} ${this.props.selectors.cell}--red`} key={(this.props.rowIndex + index).toString()}>
                    {element}
                </div>
            );
        } else {
            return (
                <div className={this.props.selectors.cell} key={(this.props.rowIndex + index).toString()}>
                    {element}
                </div>
            );
        }
        
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

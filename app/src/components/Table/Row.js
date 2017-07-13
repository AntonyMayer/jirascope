import React, { Component } from 'react';

class Row extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      date: new Date(),
      open: true
    };

    this.toggleRowVisibility = this.toggleRowVisibility.bind(this);
    this.modifierVisability = `${this.props.selectors.row}--open`;

    this.processData();
  }

  processData() {
    //accepts array and builds rows for tables
    this.data = this.props.data.map((element, index) => {
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

  toggleRowVisibility() { 
    if (this.state.open) {
        this.modifierVisability = `${this.props.selectors.row}--closed`;
        this.setState({
            date: new Date(),
            open: false
        });
    } else {
        this.modifierVisability = `${this.props.selectors.row}--open`;
        this.setState({
            date: new Date(),
            open: true
        });
    }
  }

  render() {
    return (
        <div className={`${this.props.selectors.row} ${this.modifierVisability}`} onClick={this.toggleRowVisibility}>
            {this.data}
        </div>
    );
  }
}

export default Row;

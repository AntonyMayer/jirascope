import React, { Component } from 'react';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
    //accepts array and builds cells for table row
    this.data = props.data.map((element, index) => {
        return (
            <div className={props.class} key={(this.props.rowIndex + index).toString()}>
                {element}
            </div>
        );
    });
  }

  render() {
    return (
        <div>
            {this.data}
        </div>
    );
  }
}

export default Cell;

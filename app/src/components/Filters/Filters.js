import React, { Component } from 'react';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  render() {
    return (
        <div className="Lorem" onClick={this.props.events}>
            Lorems
        </div>
    );
  }
}

export default Filter;

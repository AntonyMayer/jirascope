import React, { Component } from 'react';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  test() {
      this.props.event();
      console.log('clicked');
  }

  render() {
    return (
        <div className="Lorem" onClick={this.test.bind(this)}>
            Lorems
        </div>
    );
  }
}

export default Filter;

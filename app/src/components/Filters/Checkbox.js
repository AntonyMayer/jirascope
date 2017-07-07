import React, { Component } from 'react';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  render() {
    return (
            <div className="filter__unit">
                <label htmlFor="dev" className="filter__label">{String(this.props.id).toUpperCase()}</label>
                <input id={this.props.id} type="checkbox" className={`filter__checkbox filter__checkbox--${this.props.group}`}/>
            </div>
    );
  }
}

export default Checkbox;

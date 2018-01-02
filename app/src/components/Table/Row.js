import React, { Component } from 'react';

class Row extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      date: new Date(),
      open: true
    };

    this.toggleRowVisibility = this.toggleRowVisibility.bind(this);
    this.checkVisibility = this.checkVisibility.bind(this);

    //set default row visibility (except first row with headers)
    this.projectKey = this.props.data[1] ? this.props.data[1].toString() : Math.random();
    this.rowKey = this.props.data[0].toString();
    this.checkVisibility();
    

    this.processData();
  }

  componentDidUpdate() {
    this.checkVisibility();  
  }

  processData() {
    //accepts array 
    this.data = this.props.data.map((element, index) => {
        
        // firework trick
        if (Number(element) >= 100 && this.projectKey !== "-") {
            document.body.classList.add('fireworks'); 
        } else {
            document.body.classList.remove('fireworks'); 
        }

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
        localStorage.setItem(`row--${this.rowKey}`, `closed`);
        localStorage.setItem(`column--${this.projectKey}`, `closed`);
        this.columnVisability(false);
        this.setState({
            date: new Date(),
            open: false
        });
    } else {
        this.modifierVisability = `${this.props.selectors.row}--open`;
        localStorage.removeItem(`row--${this.rowKey}`);
        localStorage.removeItem(`column--${this.projectKey}`);
        this.columnVisability(true);
        this.setState({
            date: new Date(),
            open: true
        });
    }
  }

  checkVisibility() {
    if (localStorage.getItem(`row--${this.rowKey}`) === `closed` && Number(this.props.rowIndex) > 0) {
        this.modifierVisability = `${this.props.selectors.row}--closed`;
        this.state.open = false;
        // this.columnVisability(false);
    } else {
        this.modifierVisability = `${this.props.selectors.row}--open`;
    }
  }

  columnVisability(visible) {
    let table = document.getElementsByClassName(`${this.props.selectors.table}--assignees`)[0],
        headersRow = table.getElementsByClassName(`${this.props.selectors.row}`)[0],
        headersValues = headersRow.getElementsByClassName(`${this.props.selectors.cell}`),
        rows = table.getElementsByClassName(`${this.props.selectors.row}`),
        columnIndex = -1;

        //find project column index
        for (let i = 0, len = headersValues.length; i < len; i++) {
            if (headersValues[i].innerText === this.projectKey) {
                columnIndex = i;
                break;
            }
        }

        if (columnIndex < 0) return;

        //hide all cells with that index
        for (let i = 0, len = rows.length; i < len; i++) {
            let cells = rows[i].getElementsByClassName(this.props.selectors.cell);
            if (visible) {
                cells[columnIndex].classList.remove(`${this.props.selectors.cell}--hidden`);
            } else {
                cells[columnIndex].classList.add(`${this.props.selectors.cell}--hidden`);            
            }
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

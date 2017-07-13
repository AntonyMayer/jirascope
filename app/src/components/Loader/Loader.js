import React, { Component } from 'react';
import './Loader.css';

class Loader extends Component {
    constructor(props) {
        super(props);
        this.data = '0';

        //listen to global updates
        this.endUpdate = this.endUpdate.bind(this);
        window.addEventListener('globalUpdate', this.endUpdate);

        this.state = {
            date: new Date(),
            modifier: "loader__time--update-start"
        }
        console.log(this.state.modifier);
        
    }

    endUpdate() {
        this.data = this.state.date.toLocaleTimeString();

        if (this.state.modifier === "loader__time--update-start") {
            this.setState({
                date: new Date(),
                modifier: "loader__time--update-end"
            });
        } else {
            this.setState({
                date: new Date(),
                modifier: "loader__time--update-start"
            });
        }
    }

    render() {
        return (
            <div className = "loader">
                <b className="loader__title">UPATED</b> &#9658; 
                <b className={`loader__time ${this.state.modifier}`}>{this.data}</b>
            </div>
        );  
    }
}

export default Loader;
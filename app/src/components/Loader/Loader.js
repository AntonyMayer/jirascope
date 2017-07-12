import React, { Component } from 'react';
// import Jirascope from '../../jirascope';
import './Loader.css';

class Loader extends Component {
    constructor(props) {
        super(props);
        this.data = '0';

        //listen to global updates
        
        this.endUpdate = this.endUpdate.bind(this);
        window.addEventListener('globalUpdate', this.endUpdate);

        this.state = {
            date: new Date()
        }
    }

    endUpdate() {
        this.data = this.state.date.toLocaleTimeString();
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div className = "loader">
                <b className="loader__title">UPATED</b> &#9658; 
                <b className="loader__time">{this.data}</b>
            </div>
        );  
    }
}

export default Loader;
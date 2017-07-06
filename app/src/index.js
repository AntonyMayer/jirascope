import React from 'react';
import ReactDOM from 'react-dom';
import Page from './components/Page/Page';
import registerServiceWorker from './registerServiceWorker';

// window.onpopstate = function(event) {
//   console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
// };

ReactDOM.render(<Page />, document.getElementById('root'));

registerServiceWorker();

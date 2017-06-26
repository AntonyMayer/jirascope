import React from 'react';
import ReactDOM from 'react-dom';
import Tables from './components/Tables/Tables';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Tables />, document.getElementById('root'));
registerServiceWorker();

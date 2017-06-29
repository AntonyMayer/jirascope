import React from 'react';
import ReactDOM from 'react-dom';
import jirascope from './jirascope';
import Page from './components/Page/Page';
import registerServiceWorker from './registerServiceWorker';

if (jirascope) {
    ReactDOM.render(<Page />, document.getElementById('root'));
    registerServiceWorker();
}

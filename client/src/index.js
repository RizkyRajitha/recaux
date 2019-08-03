import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import './bootstrap-material-design-dist/css/bootstrap-material-design.css'
//import './bootstrap-material-design-dist/js/bootstrap-material-design.js.map'

//import LoginPage from './pages/login/Login-ref';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();

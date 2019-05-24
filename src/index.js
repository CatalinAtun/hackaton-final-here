import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// import Home from './components/Home/Home'
// import Map from './components/Map'
// import EventInfo3 from './components/EventInfo3/EventInfo3'
// import Notifications from './components/Notifications/Notifications'
import * as serviceWorker from './serviceWorker';
// import Loading from './components/Loading/Loading'
// import Profile from './components/Profile/Profile';
// import ModalM from './components/Modal/Modal';
//import Preferences from './components/Preferences/Preferences';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


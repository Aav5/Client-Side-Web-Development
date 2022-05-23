import React from 'react';
import ReactDOM from 'react-dom';
import sens from './senators.json'
//render the App component here!
import { App } from './App.js'


ReactDOM.render(<App senators={sens}/>, document.getElementById('root'));
import React from 'react';
import ReactDOM from 'react-dom';
import { Wrapper } from './Wrapper/Wrapper';
import 'babel-polyfill';

// base styling
import './scss/index.scss';

ReactDOM.render(<Wrapper />, document.getElementById('app'));

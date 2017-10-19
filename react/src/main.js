import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<h1>From React</h1>, document.getElementById('app'));
})

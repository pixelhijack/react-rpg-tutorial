import React from 'react';
import ReactDOM from 'react-dom';

const App = React.createClass({
  render: function() {
    return (<div>Hello world from a real React app!</div>)
  }
});

const mountNode = document.querySelector('#app');
ReactDOM.render(<App />, mountNode);
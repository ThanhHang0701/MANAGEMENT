import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterURL from './routes/route'

class App extends Component {
  render() {
    return (
      <Router >
      <RouterURL />
    </Router>
    );
  }
}

export default App;

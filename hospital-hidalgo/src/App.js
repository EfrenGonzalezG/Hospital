import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import AppComponent from './components/AppComponent';

// ...

class App extends Component {
  render() {
    return (
      <Router>
        <AppComponent></AppComponent>
      </Router>
    );
  }
}

export default App;
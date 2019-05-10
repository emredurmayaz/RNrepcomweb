import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import '../App.css';
import ContactScreen from '../Pages/ContactScreen';
import LoginScreen from '../Pages/LoginScreen';

class App extends Component {
  state = {
    users: [],
  };

  render() {
    return (
      <Router>
        <div className={'container'}>
          <Route path="/login" strict exact component={LoginScreen} />
          <Route path="/" strict exact component={ContactScreen} />
        </div>
      </Router>
    );
  }
}

export default App;

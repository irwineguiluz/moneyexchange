import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Login from './screens/login';
import Landing from './screens/landing';

class Main extends Component {
  render () {
    return (
      <main>
        <Router>
        <div>
          <Switch>
            <Route path="/home">
              <Landing />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </div>
        </Router>
      </main>
    );
  }
}

export default Main;
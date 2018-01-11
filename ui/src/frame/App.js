import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from '../assets/logo.svg';
import '../style/App.css';
import { Button } from 'antd';

class App extends Component {
  render() {
    return (
      <div className="App">
          <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
          </header>
          <Switch>
              <Route path="/" exact render={
                  ({ match }) => (
                      <p className="App-intro">
                          To get started, edit <code>src/App.js</code> and save to reload.
                      </p>
                  )
              }/>
              <Route path="/antd" exact render={
                  ({ match }) => (
                      <Button type="primary">Button</Button>
                  )
              }/>
          </Switch>
      </div>
    );
  }
}

export default App;

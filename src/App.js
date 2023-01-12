import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Config from './pages/Config';

// import logo from './trivia.png';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/settings" component={ Config } />
    </Switch>
  );
}

export default App;

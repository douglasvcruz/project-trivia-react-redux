import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Config from './pages/Config';
import Game from './pages/Game';
import './App.css';
import Feedback from './pages/Feedback';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/settings" component={ Config } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/feedback" component={ Feedback } />
    </Switch>
  );
}

export default App;

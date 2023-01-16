import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Config from './pages/Config';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/settings" component={ Config } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/ranking" component={ Ranking } />
    </Switch>
  );
}

export default App;

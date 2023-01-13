import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
// import logo from './trivia.png';
import './App.css';
import Game from './pages/Game';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
    </Switch>
  );
}

export default App;

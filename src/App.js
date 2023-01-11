import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
// import logo from './trivia.png';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;

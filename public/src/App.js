import React from 'react';
import {Route,Switch} from 'react-router-dom'
import './App.css';
import HomePage from './components/Homepage/Homepage'


function App() {
  return (
      <Switch>
        <Route exact path ="/" component={ HomePage }/>
      </Switch>
  );
}

export default App;

import React from 'react';
import {Route,Switch} from 'react-router-dom'
import './App.css';
import HomePage from './components/Homepage/Homepage'
import Login from './components/Login/Login'
import LandingPage from './components/Landingpage/Landingpage'


function App() {
  return (
      <Switch>
        <Route exact path ="/" component={ LandingPage }/>
        <Route exact path ="/loginPage" component={ Login }/>
        <Route exact path ="/homepage" component={ HomePage}/>
      </Switch>
  );
}

export default App;

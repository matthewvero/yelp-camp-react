import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router';
import LandingPage from './pages/landingpage/landingpage'
import Homepage from './pages/homepage/homepage';

function App() {
  return (

    <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/home' component={Homepage}/>
        </Switch>
    </div>
  );
}

export default App;

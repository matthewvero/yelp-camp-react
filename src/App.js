import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router';
import LandingPage from './pages/landingpage/landingpage'
import Homepage from './pages/homepage/homepage';
import Header from './components/header/header.component';
import { ThemeProvider } from 'styled-components';
import {lightTheme, darkTheme} from '../src/theme/themes';
import { connect } from 'react-redux';


function App({darkMode}) {
  return (

    <div className="App">
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Header/>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/home' component={Homepage}/>
        </Switch>
        </ThemeProvider>
    </div>
  );
}

const mapStateToProps = (state) => ({
    darkMode: state.themeReducer.darkMode
})




export default connect(mapStateToProps)(App);


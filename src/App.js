import React, { useEffect } from 'react';
import './App.css';
import {Switch, Route} from 'react-router';
import LandingPage from './pages/landingpage/landingpage'
import Homepage from './pages/homepage/homepage';
import Header from './components/header/header.component';
import { ThemeProvider } from 'styled-components';
import {lightTheme, darkTheme} from '../src/theme/themes';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';
import { setUser } from './redux/auth-redux/auth.actions';


function App() {
  const darkMode = useSelector(state => state.themeReducer.darkMode)
  const userProfile = useSelector(state => state.authReducer.user)

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        dispatch(setUser(user))
      }
      
    });
  }, [])

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






export default App;


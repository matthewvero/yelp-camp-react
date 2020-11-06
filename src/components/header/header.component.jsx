import React, { useContext, useRef } from 'react'
import { withRouter } from "react-router";
import { HeaderContainer, HeaderLogo } from './header.styles'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMountain} from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from 'styled-components'
import ThemeToggleButton from '../themetogglebutton/themetogglebutton.component'
import HeaderDropDownButton from '../headerdropdownbutton/header-dropdown-button.component';
import Login from '../login/login.component';
import Signup from '../signup/signup.component';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

const Header = ({history}) => {
      const myRef = useRef(null);
      const user = useSelector(state => state.authReducer.user)
      const themeContext = useContext(ThemeContext)
      return (
            <HeaderContainer ref={myRef}>
                  <HeaderLogo style={{marginLeft: '1%'}} onClick={() => history.push('/')}>
                        YelpCamp <FontAwesomeIcon style={{color: themeContext.color}}icon={faMountain}/>
                  </HeaderLogo>
                  <div style={{display: 'flex', width: 'auto', justifyContent: 'space-around', marginRight: '50px'}}>
                        
                        <CSSTransition 
                              in={!user.hasOwnProperty('displayName')}
                              classname="headerbutton"
                              unmountOnExit
                              timeout={500}
                        >
                              <HeaderDropDownButton title='Log In'>
                                    <Login/>
                              </HeaderDropDownButton>
                        </CSSTransition>

                        <HeaderDropDownButton title={user.hasOwnProperty('displayName') ? 'Profile' : 'Sign Up'}>
                              <Signup/>
                        </HeaderDropDownButton>
                        
                        <ThemeToggleButton/>
                  </div>
            </HeaderContainer>
      )
}

export default withRouter(Header);

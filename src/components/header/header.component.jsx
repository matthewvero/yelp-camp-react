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

const Header = ({history}) => {
      const myRef = useRef(null);
      const themeContext = useContext(ThemeContext)
      
      return (
            <HeaderContainer ref={myRef}>
                  <HeaderLogo style={{marginLeft: '1%'}} onClick={() => history.push('/')}>
                        YelpCamp <FontAwesomeIcon style={{color: themeContext.color}}icon={faMountain}/>
                  </HeaderLogo>
                  <div style={{display: 'flex', width: '350px', justifyContent: 'space-around', marginRight: '50px'}}>
                        
                        <HeaderDropDownButton title='Log In'>
                              <Login/>
                        </HeaderDropDownButton>

                        <HeaderDropDownButton title='Sign up'>
                              <Signup/>
                        </HeaderDropDownButton>
                        
                        <ThemeToggleButton/>
                  </div>
            </HeaderContainer>
      )
}

export default withRouter(Header);

import React, { useContext } from 'react'
import { withRouter } from "react-router";
import { HeaderButton, HeaderContainer, HeaderLogo } from './header.styles'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMountain, faUser} from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from 'styled-components'
import ThemeToggleButton from '../themetogglebutton/themetogglebutton.component'

const Header = ({history}) => {

      const themeContext = useContext(ThemeContext)
      return (
            <HeaderContainer>
                  <HeaderLogo style={{marginLeft: '1%'}} onClick={() => history.push('/')}>
                        YelpCamp <FontAwesomeIcon style={{color: themeContext.color}}icon={faMountain}/>
                  </HeaderLogo>
                  <div style={{display: 'flex', width: '350px', justifyContent: 'space-around', marginRight: '20px'}}>
                        <HeaderButton>
                              <div 
                                    style={{
                                          height: '33px', 
                                          width: '33px', 
                                          backgroundColor: themeContext.backgroundActive, 
                                          borderRadius: '50%', 
                                          alignItems: 'center', 
                                          display: 'flex', 
                                          justifyContent: 'center',
                                          marginLeft: '-12px',
                                          marginRight: '10px',
                                          fontSize: '1.4rem',
                                          
                                    }}
                              > 
                                    <FontAwesomeIcon icon={faUser}/>
                              </div>
                              Log In 
                        </HeaderButton>
                        <HeaderButton>
                              Sign Up 
                        </HeaderButton>
                        <ThemeToggleButton/>
                  </div>
            </HeaderContainer>
      )
}

export default withRouter(Header);

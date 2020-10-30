import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group'
import { ThemeContext } from 'styled-components';
import { DropdownContainer, DropdownMenuInitial, DropdownMenuSlider } from '../misc/containers.styles'
import SignupForm from '../signupform/signupform.component';

const Signup = () => {
      const [menuVisible, setMenuVisible] = useState(false);
      const [curMenu, setCurMenu] = useState('signup');
      const [height, setHeight] = useState(300);
      const themeContext = useContext(ThemeContext);
      const user = useSelector(state => state.authReducer.user);

      useEffect(() => {
            user.hasOwnProperty('email') && setCurMenu('welcome')
      }, [user]);


      return (
            <DropdownContainer height={height} onClick={e => e.stopPropagation()} onAnimationEnd={() => setMenuVisible(menuVisible => !menuVisible)}>
            
                  <CSSTransition
                        in={menuVisible && curMenu === 'signup'}
                        classNames="menu"
                        timeout={200}
                        unmountOnExit
                        onEntering={(e) => setHeight(e.clientHeight)}

                  >
                        <DropdownMenuInitial >

                              <SignupForm/>
                              
                        </DropdownMenuInitial>
                  </CSSTransition>

                  <CSSTransition
                        in={menuVisible && curMenu === 'welcome'}
                        classNames="slider"
                        timeout={1000}
                        unmountOnExit
                        onEntering={(e) => setHeight(e.clientHeight)}
                  >
                        <DropdownMenuSlider style>
                              Welcome To YelpCamp
                              <div style={{width: '100px', height: '100px', margin: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: themeContext.background, borderRadius: '50%'}}>
                                    <FontAwesomeIcon icon={faUser} style={{fontSize: '3rem'}}/>
                              </div>
                              {user.displayName}
                        </DropdownMenuSlider>
                  </CSSTransition>

            </DropdownContainer>
      )
}

export default Signup

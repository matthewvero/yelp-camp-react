import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import Button from '../button/button.component'
import { CircleButtonContainer, HeaderButton } from '../header/header.styles'
import { SubTitle } from '../misc/text.styles'
import ProfilePicture from '../profilepicture/profilepicture.component'
import { MainMenuContainer, MainMenuItem, MMDivider, MainMenuProfilePicture, MMProfile, Page, MainMenuContentSection } from './main-menu.styles'
import uiTypes from '../../redux/ui-redux/ui.types'
import { setMenuVisibility } from '../../redux/ui-redux/ui.actions'
import { FormInputText } from '../inputs/input-text/inputs.styles'
import SignupForm from '../authentication/signupform/signupform.component'
import LogInForm from '../authentication/loginform/login-form.component'
import { auth } from '../../firebase'
import { destroySession } from '../../redux/auth-redux/auth.actions'
const MainMenu = () => {
      const user = useSelector(state => state.authReducer.user)
      const menuVisible = useSelector(state => state.uiReducer[uiTypes.mainMenu]);
      const [activeMainMenuPage, setActiveMainMenuPage] = useState('default')
      const dispatch = useDispatch()
      const ref = useRef()
      const handleMenuClick = (menu) => {
            setActiveMainMenuPage(menu)
      }
      const handleLogOut = () => {
            auth.signOut();
            dispatch(destroySession())
            console.log('signout')
      }

      const handleSignin = () => {
            setActiveMainMenuPage('welcome')
      }

      useEffect(() => {
            !menuVisible &&
            setActiveMainMenuPage('default');
            
      }, [menuVisible])

      useEffect(() => {
		function handleClickOutside(event) {
			// Close menu when clicked outside
			menuVisible &&
				!ref.current.contains(event.target) &&
                        dispatch(setMenuVisibility({menu: uiTypes.mainMenu, visible: false}));
		}

		// Bind the event listener
		document.addEventListener("click", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("click", handleClickOutside);
		};
      }, [dispatch, menuVisible]);
      
      useEffect(() => {
            window.addEventListener('SignedIn', handleSignin)
            return () => {
                  window.removeEventListener('SignedIn', handleSignin)
            }
      }, [])

      return (
            <CSSTransition
                  in={menuVisible}
                  classNames='mainMenu'
                  timeout={200}
                  unmountOnExit
            >
            
            <MainMenuContainer ref={ref}>
                  <MMProfile >
                        <MainMenuProfilePicture>
                              <ProfilePicture userID={user.uid} editable={false}/>
                        </MainMenuProfilePicture>
                             
                        {
                              user.hasOwnProperty('displayName') ?
                                    <React.Fragment>
                                          <SubTitle>{user.displayName}</SubTitle>
                                          <CircleButtonContainer><FontAwesomeIcon icon={faUser}/></CircleButtonContainer>
                                          <Button 
                                                styles={{margin: '10px', padding: '10px'}} 
                                                fn={() => handleLogOut()}
                                          >
                                                Log Out
                                          </Button>
                                    </React.Fragment>
                              :
                                    <React.Fragment>
                                          <HeaderButton 
                                                styles={{margin: '10px', padding: '10px'}}
                                                onClick={() => handleMenuClick('login')}
                                          >
                                                Log In
                                          </HeaderButton>
                                          <HeaderButton 
                                                styles={{margin: '10px', padding: '10px'}}
                                                onClick={() => handleMenuClick('signup')}
                                          >
                                                Sign Up
                                          </HeaderButton>
                                    </React.Fragment>
                        }
                              
                  </MMProfile>
                  <MMDivider/>
                  <MainMenuContentSection >
                  
                        <CSSTransition
                              in={activeMainMenuPage === 'default'}
                              classNames='mainMenuPage'
                              timeout={100}
                              unmountOnExit
                        >
                              <Page>
                              
                              </Page>
                        </CSSTransition>
                        <CSSTransition
                              in={activeMainMenuPage === 'signup'}
                              classNames='mainMenuPage'
                              timeout={100}
                              unmountOnExit
                        >
                              <Page>
                                    <SignupForm/>
                              </Page>
                        </CSSTransition>
                        <CSSTransition
                              in={activeMainMenuPage === 'login'}
                              classNames='mainMenuPage'
                              timeout={100}
                              unmountOnExit
                        >
                              <Page>
                                    <LogInForm/>
                              </Page>
                        </CSSTransition>
                        <CSSTransition
                        in={activeMainMenuPage === 'welcome'}
                        classNames='mainMenuPage'
                        timeout={100}
                        unmountOnExit
                  >
                        <Page>
                              <h1>Welcome</h1>
                        </Page>
                  </CSSTransition>
                  </MainMenuContentSection>
            </MainMenuContainer>
            
            </CSSTransition>
      )
}

export default MainMenu

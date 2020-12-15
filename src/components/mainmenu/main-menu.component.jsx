import { faChevronLeft, faCog, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { CircleButtonContainer, HeaderButton } from '../header/header.styles'
import { SubTitle } from '../misc/text.styles'
import ProfilePicture from '../profilepicture/profilepicture.component'
import { MainMenuContainer, MainMenuItem, MMDivider, MainMenuProfilePicture, MMProfile, Page, MainMenuContentSection, MainMenuButtonContainer } from './main-menu.styles'
import uiTypes from '../../redux/ui-redux/ui.types'
import { setMainMenuSubMenu, setMenuVisibility } from '../../redux/ui-redux/ui.actions'
import SignupForm from '../authentication/signupform/signupform.component'
import LogInForm from '../authentication/loginform/login-form.component'
import { auth } from '../../firebase'
import { destroySession } from '../../redux/auth-redux/auth.actions'
import { ThemeContext } from 'styled-components'
import { withRouter } from 'react-router'
import Button from '../button/button.component'
import ThemeToggleButton from '../themetogglebutton/themetogglebutton.component'
import withTouchAnimator from '../touch-hoc/touch-hoc.component'
const MainMenu = ({history}) => {
      const user = useSelector(state => state.authReducer.user)
      const menuVisible = useSelector(state => state.uiReducer[uiTypes.menus.mainMenu]);
      const themeContext = useContext(ThemeContext);
      const CircleButtonTouch = withTouchAnimator(CircleButtonContainer);
      const activeSubMenu = useSelector(state => state.uiReducer[uiTypes.mainMenuActiveSub])

      const dispatch = useDispatch()
      const ref = useRef()

      const handleLogOut = () => {
            auth.signOut();
            dispatch(destroySession())
            console.log('signout')
      }

      const goToProfile = () => {
            history.push(`/profile/${user.uid}`);
            dispatch(setMenuVisibility({menu: uiTypes.mainMenu, visible: false}))
      }

      const handleSignUp = () => {
            dispatch(setMainMenuSubMenu(uiTypes.subMenus.welcome));
      }

      useEffect(() => {
            !menuVisible &&
            dispatch(setMainMenuSubMenu(uiTypes.subMenus.default));
            
      }, [dispatch, menuVisible])

      useEffect(() => {
		function handleClickOutside(event) {
			// Close menu when clicked outside
			menuVisible &&
				!ref.current.contains(event.target) &&
                        dispatch(setMenuVisibility({menu: uiTypes.menus.mainMenu, visible: false}));
		}

		// Bind the event listener
		document.addEventListener("click", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("click", handleClickOutside);
		};
      }, [dispatch, menuVisible]);
      
      useEffect(() => {
            window.addEventListener('SignedIn', handleSignUp)
            return () => {
                  window.removeEventListener('SignedIn', handleSignUp)
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
                                          <CircleButtonTouch 
                                                style={{marginLeft: 'auto', marginRight: '30px'}}
                                                onClick={() => goToProfile()}
                                          >
                                                <FontAwesomeIcon icon={faUser}/>
                                          </CircleButtonTouch>
                                    </React.Fragment>
                              :
                                    <MainMenuButtonContainer>
                                          <HeaderButton 
                                                styles={{margin: '10px', padding: '10px'}}
                                                onClick={() => dispatch(setMainMenuSubMenu(uiTypes.subMenus.login))}
                                          >
                                                Log In
                                          </HeaderButton>
                                          <HeaderButton 
                                                styles={{margin: '10px', padding: '10px'}}
                                                onClick={() => dispatch(setMainMenuSubMenu(uiTypes.subMenus.signup))}
                                          >
                                                Sign Up
                                          </HeaderButton>
                                    </MainMenuButtonContainer>
                        }
                              
                  </MMProfile>
                  <MMDivider/>
                  <MainMenuContentSection >
                  
                        <CSSTransition
                              in={activeSubMenu === uiTypes.subMenus.default}
                              classNames='mainMenuPage'
                              timeout={100}
                              unmountOnExit
                        >
                              <Page>
                                    <MainMenuItem onClick={() => dispatch(setMainMenuSubMenu(uiTypes.subMenus.settings))}>
                                          <SubTitle>Settings</SubTitle>
                                          <FontAwesomeIcon icon={faCog} style={{color: themeContext.textAlt, margin: '0 10px', fontSize: '1.3rem'}}/>
                                    </MainMenuItem>
                              </Page>
                        </CSSTransition>
                        <CSSTransition
                              in={activeSubMenu === uiTypes.subMenus.signup}
                              classNames='mainMenuPage'
                              timeout={100}
                              unmountOnExit
                        >
                              <Page>
                                    <MainMenuItem onClick={() => dispatch(setMainMenuSubMenu(uiTypes.subMenus.default))}>
                                          <FontAwesomeIcon icon={faChevronLeft} style={{color: themeContext.color, margin: '0 10px', fontSize: '1.3rem'}}/>
                                    </MainMenuItem>
                                    <SignupForm/>
                              </Page>
                        </CSSTransition>
                        <CSSTransition
                              in={activeSubMenu === uiTypes.subMenus.login}
                              classNames='mainMenuPage'
                              timeout={100}
                              unmountOnExit
                        >
                              <Page>
                                    <MainMenuItem onClick={() => dispatch(setMainMenuSubMenu(uiTypes.subMenus.default))}>
                                          <FontAwesomeIcon icon={faChevronLeft} style={{color: themeContext.color, margin: '0 10px', fontSize: '1.3rem'}}/>
                                    </MainMenuItem>
                                    <LogInForm/>
                              </Page>
                        </CSSTransition>
                        <CSSTransition
                              in={activeSubMenu === uiTypes.subMenus.welcome}
                              classNames='mainMenuPage'
                              timeout={100}
                              unmountOnExit
                        >
                              <Page>
                                    <h1>Welcome</h1>
                              </Page>
                        </CSSTransition>
                        <CSSTransition
                              in={activeSubMenu === uiTypes.subMenus.settings}
                              classNames='mainMenuPage'
                              timeout={100}
                              unmountOnExit
                        >
                              <Page>
                                    <MainMenuItem onClick={() => dispatch(setMainMenuSubMenu(uiTypes.subMenus.default))}>
                                          <FontAwesomeIcon icon={faChevronLeft} style={{color: themeContext.color, margin: '0 10px', fontSize: '1.3rem'}}/>
                                    </MainMenuItem>
                                    <SubTitle styles={{margin: '5px 0'}}>Settings</SubTitle>
                                    <MMDivider/>
                                    <MainMenuItem onClick={() => handleLogOut()}>
                                          <SubTitle>Log Out</SubTitle>
                                    </MainMenuItem>
                                    <ThemeToggleButton/>
                              </Page>
                        </CSSTransition>
                  </MainMenuContentSection>
            </MainMenuContainer>
            
            </CSSTransition>
      )
}

export default withRouter(MainMenu);

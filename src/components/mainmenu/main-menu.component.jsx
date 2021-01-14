import { faChevronLeft, faCog, faHeart, faUser } from '@fortawesome/free-solid-svg-icons'
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
import ThemeToggleButton from '../themetogglebutton/themetogglebutton.component'
import withTouchAnimator from '../touch-hoc/touch-hoc.component'
import { useClickOutside } from '../../utils/ui-hooks'
const MainMenu = ({history}) => {
      const user = useSelector(state => state.authReducer.user)
      const menuVisible = useSelector(state => state.uiReducer[uiTypes.menus.mainMenuVisible]);
      const themeContext = useContext(ThemeContext);
      const CircleButtonTouch = withTouchAnimator(CircleButtonContainer);
      const MainMenuItemTouch = withTouchAnimator(MainMenuItem);
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

      useClickOutside(() => dispatch(setMenuVisibility({menu: uiTypes.menus.mainMenuVisible, visible: false})), menuVisible, ref)
      
      useEffect(() => {
            window.addEventListener('SignedIn', handleSignUp)
            return () => {
                  window.removeEventListener('SignedIn', handleSignUp)
            }
      }, [])



      return (
            <CSSTransition
                  in={menuVisible === true}
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
                                                style={{marginLeft: 'auto', marginRight: '10px'}}
                                                onClick={() => goToProfile()}
                                          >
                                                <FontAwesomeIcon icon={faUser}/>
                                          </CircleButtonTouch>
                                          <ThemeToggleButton />
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
                                    <MainMenuItemTouch >
                                          <SubTitle>Likes</SubTitle>
                                          <FontAwesomeIcon icon={faHeart} style={{color: themeContext.textAlt, margin: '0 10px', fontSize: '1.3rem'}}/>
                                    </MainMenuItemTouch>
                                    <MainMenuItemTouch fn={() => dispatch(setMainMenuSubMenu(uiTypes.subMenus.settings))}>
                                          <SubTitle>Settings</SubTitle>
                                          <FontAwesomeIcon icon={faCog} style={{color: themeContext.textAlt, margin: '0 10px', fontSize: '1.3rem'}}/>
                                    </MainMenuItemTouch>
                                    
                              </Page>
                        </CSSTransition>
                        <CSSTransition
                              in={activeSubMenu === uiTypes.subMenus.signup}
                              classNames='mainMenuPage'
                              timeout={100}
                              unmountOnExit
                        >
                              <Page>
                                    <MainMenuItemTouch fn={() => dispatch(setMainMenuSubMenu(uiTypes.subMenus.default))}>
                                          <FontAwesomeIcon icon={faChevronLeft} style={{color: themeContext.color, margin: '0 10px', fontSize: '1.3rem'}}/>
                                    </MainMenuItemTouch>
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
                                    <MainMenuItemTouch fn={() => dispatch(setMainMenuSubMenu(uiTypes.subMenus.default))}>
                                          <FontAwesomeIcon icon={faChevronLeft} style={{color: themeContext.color, margin: '0 10px', fontSize: '1.3rem'}}/>
                                    </MainMenuItemTouch>
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
                                    <MainMenuItemTouch fn={() => dispatch(setMainMenuSubMenu(uiTypes.subMenus.default))}>
                                          <FontAwesomeIcon icon={faChevronLeft} style={{color: themeContext.color, margin: '0 10px', fontSize: '1.3rem'}}/>
                                    </MainMenuItemTouch>
                                    <SubTitle>Welcome</SubTitle>
                              </Page>
                        </CSSTransition>
                        <CSSTransition
                              in={activeSubMenu === uiTypes.subMenus.settings}
                              classNames='mainMenuPage'
                              timeout={100}
                              unmountOnExit
                        >
                              <Page>
                                    <SubTitle styles={{margin: '5px 0'}}>Settings</SubTitle>
                                    <MMDivider/>
                                    <MainMenuItemTouch fn={() => dispatch(setMainMenuSubMenu(uiTypes.subMenus.default))}>
                                          <FontAwesomeIcon icon={faChevronLeft} style={{color: themeContext.color, margin: '0 10px', fontSize: '1.3rem'}}/>
                                    </MainMenuItemTouch>
                                    <MainMenuItemTouch fn={() => handleLogOut()}>
                                          <SubTitle>Log Out</SubTitle>
                                    </MainMenuItemTouch>
                              </Page>
                        </CSSTransition>
                  </MainMenuContentSection>
            </MainMenuContainer>
            
            </CSSTransition>
      )
}

export default withRouter(MainMenu);

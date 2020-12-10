import React, { useContext, useEffect, useRef, useState } from "react";
import { withRouter } from "react-router";
import { CircleButtonContainer, HeaderContainer, HeaderLogo } from "./header.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMountain } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "styled-components";
import ThemeToggleButton from "../themetogglebutton/themetogglebutton.component";
import HeaderDropDownButton from "../headerdropdownbutton/header-dropdown-button.component";
import Login from "../authentication/login/login.component";
import Signup from "../authentication/signup/signup.component";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { toggleMenu } from "../../redux/ui-redux/ui.actions";
import uiTypes from '../../redux/ui-redux/ui.types'

const Header = ({ history }) => {
	const myRef = useRef(null);
	const user = useSelector((state) => state.authReducer.user);
	const themeContext = useContext(ThemeContext);
	const dispatch = useDispatch();

	const [collapsed, setCollapsed] = useState(window.matchMedia(`(max-width: ${themeContext.smallBreakPoint})`).matches);
      useEffect(() => { // Need to add this to redux to keep code DRY.
            const windowSize = window.matchMedia(`(max-width: ${themeContext.mediumBreakPoint})`);
            const handleChange = e => {
                  if(e.matches) {
                        setCollapsed(true);
                  } else {
                        setCollapsed(false);
                  }
            }
            windowSize.addEventListener('change', handleChange);
            return () => {
                  windowSize.removeEventListener('change', handleChange);
            }
      }, [])

	return (
		<HeaderContainer ref={myRef}>
			<HeaderLogo
				style={{ marginLeft: "1%" }}
				onClick={() => history.push("/home")}
			>
				YelpCamp{" "}
				<FontAwesomeIcon
					style={{ color: themeContext.color }}
					icon={faMountain}
				/>
			</HeaderLogo>
			
			
			
			<div
			style={{
				display: "flex",
				width: "auto",
				justifyContent: "space-around",
			}}
			>
			{
			!collapsed && 
				<React.Fragment>
				
				<HeaderDropDownButton 
					title="Log In"
					contains={uiTypes.logInMenu}
				>
					<Login />
				</HeaderDropDownButton>
				
				
				<HeaderDropDownButton
					title='Sign Up'
					contains={uiTypes.signUpMenu}
				>
				<Signup />
				</HeaderDropDownButton>
				
				<ThemeToggleButton />
				</React.Fragment>
			}
				<CircleButtonContainer onClick={() => dispatch(toggleMenu(uiTypes.mainMenu))}><FontAwesomeIcon icon={faBars}/></CircleButtonContainer>

			</div>
			
		</HeaderContainer>
	);
};

export default withRouter(Header);

import React, { useContext, useEffect, useRef, useState } from "react";
import { withRouter } from "react-router";
import {
	CircleButtonContainer,
	HeaderButton,
	HeaderContainer,
	HeaderLogo,
	MenuButtonIcon,
} from "./header.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMountain, faTimes } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "styled-components";
import ThemeToggleButton from "../themetogglebutton/themetogglebutton.component";
import { useDispatch, useSelector } from "react-redux";
import {
	setMainMenuSubMenu,
	setMenuVisibility,
	toggleMenu,
} from "../../redux/ui-redux/ui.actions";
import uiTypes from "../../redux/ui-redux/ui.types";
import withTouchAnimator from "../touch-hoc/touch-hoc.component";
import { CSSTransition } from "react-transition-group";

const Header = ({ history }) => {
	const myRef = useRef(null);
	const theme = useContext(ThemeContext);
	const dispatch = useDispatch();
	const CircleButtonTouch = withTouchAnimator(CircleButtonContainer);
	const user = useSelector((state) => state.authReducer.user);
	const [collapsed, setCollapsed] = useState(
		window.matchMedia(`(max-width: ${theme.smallBreakPoint})`).matches
	);
	const menuVisible = useSelector(
		(state) => state.uiReducer[uiTypes.menus.mainMenuVisible]
	);
	const handleLogIn = () => {
		dispatch(
			setMenuVisibility({
				menu: uiTypes.menus.mainMenuVisible,
				visible: true,
			})
		);
		dispatch(setMainMenuSubMenu(uiTypes.subMenus.login));
	};

	const handleSignUp = () => {
		dispatch(
			setMenuVisibility({
				menu: uiTypes.menus.mainMenuVisible,
				visible: true,
			})
		);
		dispatch(setMainMenuSubMenu(uiTypes.subMenus.signup));
	};

	useEffect(() => {
		// Need to add this to redux to keep code DRY.
		const windowSize = window.matchMedia(
			`(max-width: ${theme.mediumBreakPoint})`
		);
		const handleChange = (e) => {
			if (e.matches) {
				setCollapsed(true);
			} else {
				setCollapsed(false);
			}
		};
		windowSize.addEventListener("change", handleChange);
		return () => {
			windowSize.removeEventListener("change", handleChange);
		};
	}, [theme.mediumBreakPoint]);

	const HeaderButtonTouch = withTouchAnimator(HeaderButton);
	return (
		<HeaderContainer ref={myRef}>
			<HeaderLogo
				style={{ marginLeft: "1%" }}
				onClick={() => history.push("/home")}
			>
				YelpCamp{" "}
				<FontAwesomeIcon
					style={{ color: theme.color }}
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
				{!collapsed && !user.hasOwnProperty("uid") && (
					<React.Fragment>
						<HeaderButtonTouch
							onClick={() => handleLogIn()}
						>
							Log In
						</HeaderButtonTouch>

						<HeaderButtonTouch
							onClick={() => handleSignUp()}
						>
							Sign Up
						</HeaderButtonTouch>

						<ThemeToggleButton />
					</React.Fragment>
				)}
				<CircleButtonTouch
					onClick={() =>
						dispatch(
							toggleMenu(
								uiTypes.menus.mainMenuVisible
							)
						)
					}
				>
					<FontAwesomeIcon
						icon={menuVisible ? faTimes : faBars}
						style={{
							color: menuVisible
								? "crimson"
								: theme.color,
						}}
					/>
				</CircleButtonTouch>
			</div>
		</HeaderContainer>
	);
};

export default withRouter(Header);

import {
	faChevronLeft,
	faCog,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { CircleButtonContainer } from "../header/header.styles";
import { SubTitle } from "../misc/text.styles";
import ProfilePicture from "../profilepicture/profilepicture.component";
import {
	MainMenuContainer,
	MainMenuItem,
	MMDivider,
	MainMenuProfilePicture,
	MMProfile,
	Page,
	MainMenuContentSection,
} from "./main-menu.styles";
import uiTypes from "../../redux/ui-redux/ui.types";
import {
	setMainMenuSubMenu,
	setMenuVisibility,
} from "../../redux/ui-redux/ui.actions";
import SignupForm from "../authentication/signupform/signupform.component";
import LogInForm from "../authentication/loginform/login-form.component";
import { auth } from "../../firebase";
import { destroySession } from "../../redux/auth-redux/auth.actions";
import { ThemeContext } from "styled-components";
import { withRouter } from "react-router";
import ThemeToggleButton from "../themetogglebutton/themetogglebutton.component";
import withTouchAnimator from "../touch-hoc/touch-hoc.component";
import { useClickOutside } from "../../utils/ui-hooks";
const MainMenu = ({ history }) => {
	const user = useSelector((state) => state.authReducer.user);
	const menuVisible = useSelector(
		(state) => state.uiReducer[uiTypes.menus.mainMenuVisible]
	);
	const themeContext = useContext(ThemeContext);
	const CircleButtonTouch = withTouchAnimator(CircleButtonContainer);
	const MainMenuItemTouch = withTouchAnimator(MainMenuItem);
	const activeSubMenu = useSelector(
		(state) => state.uiReducer[uiTypes.mainMenuActiveSub]
	);
	const dispatch = useDispatch();
	const menuRef = useRef();
	const subMenuRef = useRef();
	const settingsRef = useRef();
	const loginRef = useRef();
	const signUpRef = useRef();
	const welcomeRef = useRef();

	const handleLogOut = () => {
		auth.signOut();
		dispatch(destroySession());
	};

	const goToProfile = () => {
		history.push(`/profile/${user.uid}`);
		dispatch(
			setMenuVisibility({ menu: uiTypes.mainMenu, visible: false })
		);
	};

	useEffect(() => {
		!menuVisible &&
			dispatch(setMainMenuSubMenu(uiTypes.subMenus.default));
	}, [dispatch, menuVisible]);

	useClickOutside(
		() =>
			dispatch(
				setMenuVisibility({
					menu: uiTypes.menus.mainMenuVisible,
					visible: false,
				})
			),
		menuVisible,
		menuRef
	);

	// Listen for sign in
	useEffect(() => {
		const handleSignUp = () => {
			dispatch(setMainMenuSubMenu(uiTypes.subMenus.welcome));
		};
		window.addEventListener("SignedIn", handleSignUp);
		return () => {
			window.removeEventListener("SignedIn", handleSignUp);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<CSSTransition
			in={menuVisible === true}
			classNames="mainMenu"
			timeout={200}
			unmountOnExit
			nodeRef={menuRef}
		>
			<MainMenuContainer ref={menuRef}>
				{user.hasOwnProperty("displayName") && (
					<React.Fragment>
						<MMProfile>
							<MainMenuProfilePicture>
								<ProfilePicture
									userID={user.uid}
									editable={false}
								/>
							</MainMenuProfilePicture>

							<SubTitle>
								{user.displayName}
							</SubTitle>
							<CircleButtonTouch
								style={{
									marginLeft: "auto",
									marginRight: "10px",
								}}
								onClick={() => goToProfile()}
							>
								<FontAwesomeIcon
									icon={faUser}
								/>
							</CircleButtonTouch>
							<ThemeToggleButton />
						</MMProfile>
						<MMDivider />
					</React.Fragment>
				)}
				<MainMenuContentSection>
					<CSSTransition
						in={
							activeSubMenu ===
							uiTypes.subMenus.default
						}
						classNames="mainMenuPage"
						timeout={100}
						unmountOnExit
						nodeRef={subMenuRef}
					>
						<Page ref={subMenuRef}>
							<MainMenuItemTouch
								fn={() =>
									dispatch(
										setMainMenuSubMenu(
											uiTypes
												.subMenus
												.settings
										)
									)
								}
							>
								<SubTitle>Settings</SubTitle>
								<FontAwesomeIcon
									icon={faCog}
									style={{
										color:
											themeContext.textAlt,
										margin: "0 10px",
										fontSize: "1.3rem",
									}}
								/>
							</MainMenuItemTouch>
						</Page>
					</CSSTransition>
					<CSSTransition
						in={
							activeSubMenu ===
							uiTypes.subMenus.signup
						}
						classNames="mainMenuPage"
						timeout={100}
						unmountOnExit
						nodeRef={signUpRef}
					>
						<Page ref={signUpRef}>
							<MainMenuItemTouch
								fn={() =>
									dispatch(
										setMainMenuSubMenu(
											uiTypes
												.subMenus
												.default
										)
									)
								}
							>
								<FontAwesomeIcon
									icon={faChevronLeft}
									style={{
										color:
											themeContext.color,
										margin: "0 10px",
										fontSize: "1.3rem",
									}}
								/>
							</MainMenuItemTouch>
							<SignupForm />
						</Page>
					</CSSTransition>
					<CSSTransition
						in={
							activeSubMenu ===
							uiTypes.subMenus.login
						}
						classNames="mainMenuPage"
						timeout={100}
						unmountOnExit
						nodeRef={loginRef}
					>
						<Page ref={loginRef}>
							<MainMenuItemTouch
								fn={() =>
									dispatch(
										setMainMenuSubMenu(
											uiTypes
												.subMenus
												.default
										)
									)
								}
							>
								<FontAwesomeIcon
									icon={faChevronLeft}
									style={{
										color:
											themeContext.color,
										margin: "0 10px",
										fontSize: "1.3rem",
									}}
								/>
							</MainMenuItemTouch>
							<LogInForm />
						</Page>
					</CSSTransition>
					<CSSTransition
						in={
							activeSubMenu ===
							uiTypes.subMenus.welcome
						}
						classNames="mainMenuPage"
						timeout={100}
						unmountOnExit
						nodeRef={welcomeRef}
					>
						<Page ref={welcomeRef}>
							<MainMenuItemTouch
								fn={() =>
									dispatch(
										setMainMenuSubMenu(
											uiTypes
												.subMenus
												.default
										)
									)
								}
							>
								<FontAwesomeIcon
									icon={faChevronLeft}
									style={{
										color:
											themeContext.color,
										margin: "0 10px",
										fontSize: "1.3rem",
									}}
								/>
							</MainMenuItemTouch>
							<SubTitle>Welcome</SubTitle>
						</Page>
					</CSSTransition>
					<CSSTransition
						in={
							activeSubMenu ===
							uiTypes.subMenus.settings
						}
						classNames="mainMenuPage"
						timeout={100}
						unmountOnExit
						nodeRef={settingsRef}
					>
						<Page ref={settingsRef}>
							<SubTitle style={{ margin: "5px 0" }}>
								Settings
							</SubTitle>
							<MMDivider />
							<MainMenuItemTouch
								fn={() =>
									dispatch(
										setMainMenuSubMenu(
											uiTypes
												.subMenus
												.default
										)
									)
								}
							>
								<FontAwesomeIcon
									icon={faChevronLeft}
									style={{
										color:
											themeContext.color,
										margin: "0 10px",
										fontSize: "1.3rem",
									}}
								/>
							</MainMenuItemTouch>
							{user.hasOwnProperty(
								"displayName"
							) && (
								<MainMenuItemTouch
									fn={() => handleLogOut()}
								>
									<SubTitle>
										Log Out
									</SubTitle>
								</MainMenuItemTouch>
							)}
						</Page>
					</CSSTransition>
				</MainMenuContentSection>
			</MainMenuContainer>
		</CSSTransition>
	);
};

export default withRouter(MainMenu);

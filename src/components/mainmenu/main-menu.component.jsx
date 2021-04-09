import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { MainMenuContainer, MainMenuContentSection } from "./main-menu.styles";
import uiTypes from "../../redux/ui-redux/ui.types";
import {
	setMainMenuSubMenu,
	setMenuVisibility,
} from "../../redux/ui-redux/ui.actions";
import { withRouter } from "react-router";
import { useClickOutside } from "../../utils/ui-hooks";
import {
	MainMenuDefault,
	MainMenuLikes,
	MainMenuProfile,
	MainMenuSettings,
	MainMenuSignIn,
	MainMenuSignUp,
	MainMenuWelcome,
} from "./main-menu-menu-items";
const MainMenu = ({ history }) => {
	const user = useSelector((state) => state.authReducer.user);
	const userProfile = useSelector((state) => state.authReducer.userProfile);
	const menuVisible = useSelector(
		(state) => state.uiReducer[uiTypes.menus.mainMenuVisible]
	);
	const activeSubMenu = useSelector(
		(state) => state.uiReducer[uiTypes.mainMenuActiveSub]
	);
	const dispatch = useDispatch();
	const menuRef = useRef();
	const settingsRef = useRef();
	const welcomeRef = useRef();
	const loginRef = useRef();
	const signUpRef = useRef();
	const defaultMenuRef = useRef();
	const likesRef = useRef();

	useClickOutside(menuVisible, menuRef, () =>
		dispatch(
			setMenuVisibility({
				menu: uiTypes.menus.mainMenuVisible,
				visible: false,
			})
		)
	);

	// Listen for sign in
	useEffect(() => {
		const handleSignIn = (e) => {
			e.detail.type === "returningUser"
				? dispatch(setMainMenuSubMenu(uiTypes.subMenus.default))
				: dispatch(
						setMainMenuSubMenu(uiTypes.subMenus.welcome)
				  );
		};
		window.addEventListener("SignedIn", handleSignIn);
		return () => {
			window.removeEventListener("SignedIn", handleSignIn);
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
			onExited={() =>
				dispatch(setMainMenuSubMenu(uiTypes.subMenus.default))
			}
		>
			<MainMenuContainer ref={menuRef}>
				{userProfile &&
					userProfile.hasOwnProperty("displayName") && (
						<MainMenuProfile history={history} />
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
						nodeRef={defaultMenuRef}
					>
						<MainMenuDefault $ref={defaultMenuRef} />
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
						<MainMenuSignUp $ref={signUpRef} />
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
						<MainMenuSignIn $ref={loginRef} />
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
						<MainMenuWelcome $ref={welcomeRef} />
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
						<MainMenuSettings $ref={settingsRef} />
					</CSSTransition>
					<CSSTransition
						in={
							activeSubMenu ===
							uiTypes.subMenus.likes
						}
						classNames="mainMenuPage"
						timeout={100}
						unmountOnExit
						nodeRef={likesRef}
					>
						<MainMenuLikes
							$ref={likesRef}
							history={history}
						/>
					</CSSTransition>
				</MainMenuContentSection>
			</MainMenuContainer>
		</CSSTransition>
	);
};

export default withRouter(MainMenu);

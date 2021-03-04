import React, { useContext, useRef } from "react";
import {
	MainMenuItem,
	MainMenuProfilePicture,
	MMDivider,
	MMProfile,
	Page,
} from "./main-menu.styles";
import ThemeToggleButton from "../themetogglebutton/themetogglebutton.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faCog,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
	setMainMenuSubMenu,
	setMenuVisibility,
} from "../../redux/ui-redux/ui.actions";
import uiTypes from "../../redux/ui-redux/ui.types";
import { useDispatch, useSelector } from "react-redux";
import ProfilePicture from "../profilepicture/profilepicture.component";
import { SubTitle } from "../misc/text.styles";
import withTouchAnimator from "../touch-hoc/touch-hoc.component";
import { CircleButtonContainer } from "../header/header.styles";
import { CSSTransition } from "react-transition-group";
import { ThemeContext } from "styled-components";
import SignupForm from "../authentication/signupform/signupform.component";
import LogInForm from "../authentication/loginform/login-form.component";
import { auth } from "../../firebase";
import { destroySession } from "../../redux/auth-redux/auth.actions";

const MainMenuItemTouch = withTouchAnimator(MainMenuItem);

export const MainMenuProfile = ({ user, history }) => {
	const dispatch = useDispatch();
	const CircleButtonTouch = withTouchAnimator(CircleButtonContainer);
	const goToProfile = () => {
		history.push(`/profile/${user.uid}`);
		dispatch(
			setMenuVisibility({ menu: uiTypes.mainMenu, visible: false })
		);
	};

	return (
		<React.Fragment>
			<MMProfile>
				<MainMenuProfilePicture>
					<ProfilePicture
						userID={user.uid}
						editable={false}
					/>
				</MainMenuProfilePicture>

				<SubTitle>{user.displayName}</SubTitle>
				<CircleButtonTouch
					style={{
						marginLeft: "auto",
						marginRight: "10px",
					}}
					onClick={() => goToProfile()}
				>
					<FontAwesomeIcon icon={faUser} />
				</CircleButtonTouch>
				<ThemeToggleButton />
			</MMProfile>
			<MMDivider />
		</React.Fragment>
	);
};

export const MainMenuDefault = ({ $ref }) => {
	const dispatch = useDispatch();
	const theme = useContext(ThemeContext);
	return (
		<Page ref={$ref}>
			<MainMenuItemTouch
				fn={() =>
					dispatch(
						setMainMenuSubMenu(
							uiTypes.subMenus.settings
						)
					)
				}
			>
				<SubTitle>Settings</SubTitle>
				<FontAwesomeIcon
					icon={faCog}
					style={{
						color: theme.textAlt,
						margin: "0 10px",
						fontSize: "1.3rem",
					}}
				/>
			</MainMenuItemTouch>
		</Page>
	);
};

export const MainMenuSignUp = ({ $ref }) => {
	const dispatch = useDispatch();
	const theme = useContext(ThemeContext);
	return (
		<Page ref={$ref}>
			<MainMenuItemTouch
				fn={() =>
					dispatch(
						setMainMenuSubMenu(uiTypes.subMenus.default)
					)
				}
			>
				<FontAwesomeIcon
					icon={faChevronLeft}
					style={{
						color: theme.color,
						margin: "0 10px",
						fontSize: "1.3rem",
					}}
				/>
			</MainMenuItemTouch>
			<SignupForm />
		</Page>
	);
};

export const MainMenuSignIn = ({ $ref }) => {
	const dispatch = useDispatch();
	const theme = useContext(ThemeContext);
	return (
		<Page ref={$ref}>
			<MainMenuItemTouch
				fn={() =>
					dispatch(
						setMainMenuSubMenu(uiTypes.subMenus.default)
					)
				}
			>
				<FontAwesomeIcon
					icon={faChevronLeft}
					style={{
						color: theme.color,
						margin: "0 10px",
						fontSize: "1.3rem",
					}}
				/>
			</MainMenuItemTouch>
			<LogInForm />
		</Page>
	);
};

export const MainMenuWelcome = ({ $ref }) => {
	const dispatch = useDispatch();
	const theme = useContext(ThemeContext);
	return (
		<Page ref={$ref}>
			<MainMenuItemTouch
				fn={() =>
					dispatch(
						setMainMenuSubMenu(uiTypes.subMenus.default)
					)
				}
			>
				<FontAwesomeIcon
					icon={faChevronLeft}
					style={{
						color: theme.color,
						margin: "0 10px",
						fontSize: "1.3rem",
					}}
				/>
			</MainMenuItemTouch>
			<SubTitle>Welcome</SubTitle>
		</Page>
	);
};

export const MainMenuSettings = ({ $ref }) => {
	const dispatch = useDispatch();
	const theme = useContext(ThemeContext);
	const user = useSelector((state) => state.authReducer.user);

	const handleLogOut = () => {
		auth.signOut();
		dispatch(destroySession());
		dispatch(setMainMenuSubMenu(uiTypes.subMenus.default));
	};
	return (
		<Page ref={$ref}>
			<SubTitle style={{ margin: "5px 0" }}>Settings</SubTitle>
			<MMDivider />
			<MainMenuItemTouch
				fn={() =>
					dispatch(
						setMainMenuSubMenu(uiTypes.subMenus.default)
					)
				}
			>
				<FontAwesomeIcon
					icon={faChevronLeft}
					style={{
						color: theme.color,
						margin: "0 10px",
						fontSize: "1.3rem",
					}}
				/>
			</MainMenuItemTouch>
			{user.hasOwnProperty("displayName") && (
				<MainMenuItemTouch fn={() => handleLogOut()}>
					<SubTitle>Log Out</SubTitle>
				</MainMenuItemTouch>
			)}
		</Page>
	);
};

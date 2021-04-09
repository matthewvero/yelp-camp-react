import React, { useContext, useEffect, useState } from "react";
import {
	MainMenuItem,
	MainMenuProfilePicture,
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
import { SubText, SubTitle, Text } from "../misc/text.styles";
import withTouchAnimator from "../touch-hoc/touch-hoc.component";
import { CircleButtonContainer } from "../header/header.styles";
import { ThemeContext } from "styled-components";
import SignupForm from "../authentication/signupform/signupform.component";
import LogInForm from "../authentication/loginform/login-form.component";
import { auth, db } from "../../firebase";
import { destroySession } from "../../redux/auth-redux/auth.actions";
import CampsiteCardLong from "../campsitecardlong/campsite-card-long.component";
import Image from "../image/image.component";
import { withRouter } from "react-router";
const MainMenuItemTouch = withTouchAnimator(MainMenuItem);

const MainMenuPageTitle = ({ previousLocation, title }) => {
	const dispatch = useDispatch();
	const theme = useContext(ThemeContext);
	const CircleButtonTouch = withTouchAnimator(CircleButtonContainer);

	return (
		<div
			style={{
				width: "100%",
				margin: "10px 0",
				display: "grid",
				alignItems: "center",
				gridTemplateColumns: "1fr 1fr 1fr",
				placeItems: "center",
			}}
		>
			<CircleButtonTouch
				style={{
					color: theme.color,
					margin: "0 10px",
					fontSize: "1.3rem",
					gridColumn: "1/2",
				}}
				fn={() =>
					dispatch(setMainMenuSubMenu(previousLocation))
				}
			>
				<FontAwesomeIcon
					icon={faChevronLeft}
					style={{ marginRight: "3px", fontSize: "1.6rem" }}
				/>
			</CircleButtonTouch>
			<SubTitle
				style={{
					gridColumn: "2/3",
				}}
			>
				{title}
			</SubTitle>
		</div>
	);
};

export const MainMenuProfile = ({ history }) => {
	const dispatch = useDispatch();
	const CircleButtonTouch = withTouchAnimator(CircleButtonContainer);
	const userProfile = useSelector((state) => state.authReducer.userProfile);
	const goToProfile = () => {
		history.push(`/profile/${userProfile.uid}`);
		dispatch(
			setMenuVisibility({ menu: uiTypes.mainMenu, visible: false })
		);
	};

	return (
		<React.Fragment>
			<MMProfile>
				<MainMenuProfilePicture>
					<ProfilePicture
						userID={userProfile.uid}
						editable={false}
						images={userProfile.profileimages}
					/>
				</MainMenuProfilePicture>

				<SubTitle>{userProfile.displayName}</SubTitle>
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
		</React.Fragment>
	);
};

export const MainMenuDefault = ({ $ref }) => {
	const dispatch = useDispatch();
	const theme = useContext(ThemeContext);
	const userProfile = useSelector((state) => state.authReducer.userProfile);
	return (
		<Page ref={$ref}>
			{userProfile.hasOwnProperty("uid") && (
				<MainMenuItemTouch
					fn={() =>
						dispatch(
							setMainMenuSubMenu(
								uiTypes.subMenus.likes
							)
						)
					}
				>
					<SubTitle>Likes</SubTitle>
					<FontAwesomeIcon
						icon={faCog}
						style={{
							color: theme.textAlt,
							margin: "0 10px",
							fontSize: "1.3rem",
						}}
					/>
				</MainMenuItemTouch>
			)}
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
	const CircleButtonTouch = withTouchAnimator(CircleButtonContainer);
	const handleLogOut = () => {
		auth.signOut();
		dispatch(destroySession());
		dispatch(setMainMenuSubMenu(uiTypes.subMenus.default));
	};
	return (
		<Page ref={$ref}>
			<MainMenuPageTitle
				previousLocation={uiTypes.subMenus.default}
				title={"Settings"}
			/>
			{user.hasOwnProperty("displayName") && (
				<MainMenuItemTouch fn={() => handleLogOut()}>
					<SubTitle>Log Out</SubTitle>
				</MainMenuItemTouch>
			)}
		</Page>
	);
};

export const MainMenuLikes = ({ $ref, history }) => {
	const dispatch = useDispatch();
	const userProfile = useSelector((state) => state.authReducer.userProfile);
	const [campsites, setCampsites] = useState([]);
	useEffect(() => {
		const getCampsitesById = async () => {
			const campsiteRefs = await db
				.collection("campsites")
				.where("uid", "in", userProfile.likes)
				.get();

			const campsitePromises = campsiteRefs.docs.map((el) => {
				return new Promise((resolve, reject) => {
					resolve(el.data());
				});
			});
			Promise.all(campsitePromises)
				.then((data) => {
					setCampsites(data);
				})
				.catch((err) => {
					alert(err);
				});
		};
		userProfile.likes && getCampsitesById();
	}, [userProfile.likes]);

	const handleClick = (uid) => {
		dispatch(setMenuVisibility(false));
		history.push(`/campsite/${uid}`);
	};

	return (
		<Page ref={$ref}>
			<MainMenuPageTitle
				previousLocation={uiTypes.subMenus.default}
				title={"Likes"}
			/>
			<div
				style={{
					height: "100%",
					width: "100%",
					overflowY: "scroll",
					boxSizing: "border-box",
				}}
			>
				{campsites.map((el) => (
					<MainMenuItemTouch
						style={{
							height: "100px",
							padding: "0",
						}}
						fn={() => handleClick(el.uid)}
					>
						<div
							style={{
								height: "100px",
								width: "100%",
								display: "grid",
								gridTemplateColumns:
									"100px 3fr 1fr",
							}}
						>
							<Image
								style={{ gridColumn: "1/2" }}
								image={el.images[0].link}
							/>
							<div
								style={{
									gridColumn: "2/3",
									display: "flex",
									flexDirection: "column",
								}}
							>
								<Text
									style={{
										textAlign: "left",
										margin: "3%",
									}}
								>
									{el.title}
								</Text>
								<SubText
									style={{
										textAlign: "left",
										margin: "3%",
									}}
								>
									{el.description}
								</SubText>
							</div>
						</div>
					</MainMenuItemTouch>
				))}
			</div>
		</Page>
	);
};

export const MainMenuLikesRouter = withRouter(MainMenuLikes);

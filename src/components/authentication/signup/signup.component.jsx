import React, { useContext, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { ThemeContext } from "styled-components";
import {
	DropdownContainer,
	DropDownMenuPage,
} from "../../misc/containers.styles";
import SignupForm from "../signupform/signupform.component";
import Button from "../../button/button.component";
import { getUserImages, logOut } from "../../../firebase.utils.js";
import Image from "../../image/image.component";
import { SubTitle } from "../../misc/text.styles";

const Signup = ({ location, history }) => {
	const [menuVisible, setMenuVisible] = useState(false);
	const [curMenu, setCurMenu] = useState("signup");
	const [height, setHeight] = useState(300);
	const [image, setImage] = useState([]);
	const themeContext = useContext(ThemeContext);
	const user = useSelector((state) => state.authReducer.user);
	useEffect(() => {
		user.hasOwnProperty("displayName")
			? setCurMenu("welcome")
			: setCurMenu("signup");
	}, [user]);

	useEffect(() => {
		const getImages = async () => {
			const URLs = await getUserImages("profileImages", user.uid);
			setImage(URLs[0]);
		};
		getImages();
	}, [user]);

	return (
		<DropdownContainer
			height={height}
			onClick={(e) => e.stopPropagation()}
			onAnimationEnd={() =>
				setMenuVisible((menuVisible) => !menuVisible)
			}
		>
			<CSSTransition
				in={menuVisible && curMenu === "signup"}
				classNames="menu"
				timeout={200}
				unmountOnExit
				onEntering={(e) => setHeight(e.clientHeight)}
			>
				<DropDownMenuPage>
					<SignupForm />
				</DropDownMenuPage>
			</CSSTransition>

			<CSSTransition
				in={menuVisible && curMenu === "welcome"}
				classNames="menu"
				timeout={1000}
				unmountOnExit
				onEntering={(e) => setHeight(e.clientHeight)}
			>
				<DropDownMenuPage style>
					<SubTitle>Welcome To YelpCamp</SubTitle>
					<div
						style={{
							width: "100px",
							height: "100px",
							margin: "20px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor:
								themeContext.background,
							borderRadius: "50%",
							overflow: "hidden",
						}}
					>
						{image && image.length ? (
							<Image image={image} />
						) : (
							<FontAwesomeIcon
								icon={faUser}
								style={{ fontSize: "3rem" }}
							/>
						)}
					</div>
					{user.displayName}
					{location.pathname !== "/profile" && (
						<Link
							style={{
								color: themeContext.color,
								textDecoration: "none",
								margin: "10px 0",
							}}
							to={`/profile/${user.uid}`}
						>
							View Your Profile
						</Link>
					)}
					<Button
						styles={{
							padding: "5px 20px",
							margin: "10px",
						}}
						fn={() => logOut(history)}
					>
						Log Out
					</Button>
				</DropDownMenuPage>
			</CSSTransition>
		</DropdownContainer>
	);
};

export default withRouter(Signup);

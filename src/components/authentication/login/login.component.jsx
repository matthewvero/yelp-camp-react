import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { auth } from "../../../firebase";
import { getUserImages } from "../../../firebase.utils";
import { setUserProfile } from "../../../redux/auth-redux/auth.actions";
import {
	FormInputButton,
	FormInputText,
} from "../../inputs/input-text/inputs.styles";
import {
	DropdownContainer,
	DropDownMenuPage,
} from "../../misc/containers.styles";
import { ButtonText, Title } from "../../misc/text.styles";

const Login = () => {
	const userProfile = useSelector(state => state.authReducer.userProfile)
	const [loginVisible, setLoginVisible] = useState(false);
	const [height, setHeight] = useState(200);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const inputStyles = { height: "50px", width: "70%", margin: "2%" };

	const dispatch = useDispatch();
	const loginUser = async (e) => {
		e.preventDefault();
		auth.signInWithEmailAndPassword(email, password)
			.then((user) => {
				
				const getImages = async () => {
					const URLs = await getUserImages("profileImages", user.uid);
					dispatch(setUserProfile({...userProfile, profilePicture: URLs}))
				};
				getImages();
				
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<DropdownContainer
			height={height}
			onClick={(e) => e.stopPropagation()}
			onAnimationEnd={() => setLoginVisible(true)}
		>
			<CSSTransition
				classNames="menu"
				in={loginVisible}
				timeout={500}
				unmountOnExit
				onEntering={(e) => setHeight(e.clientHeight)}
			>
				<DropDownMenuPage>
					<Title style={{margin: '2%'}}>Log In</Title>
					<form
						style={{
							width: "100%",
							height: "80%",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "space-evenly",
						}}
						onSubmit={(e) => loginUser(e)}
					>
						<label htmlFor='email'>Email</label>
						<FormInputText
							style={inputStyles}
							type="email"
							id='email'
							value={email}
							onChange={(e) =>
								setEmail(e.target.value)
							}
						/>
						<label htmlFor='password'>Password</label>
						<FormInputText
							style={inputStyles}
							type="password"
							id='password'
							value={password}
							onChange={(e) =>
								setPassword(e.target.value)
							}
						/>
						<FormInputButton style={inputStyles}>
							<ButtonText>Log In</ButtonText>
						</FormInputButton>
					</form>
				</DropDownMenuPage>
			</CSSTransition>
		</DropdownContainer>
	);
};

export default Login;

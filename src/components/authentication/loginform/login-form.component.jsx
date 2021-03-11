import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../../firebase";
import { setUserProfile } from "../../../redux/auth-redux/auth.actions";
import {
	FormInputButton,
	FormInputLabel,
	FormInputText,
} from "../../inputs/input-text/inputs.styles";
import { ButtonText, Title } from "../../misc/text.styles";

const LogInForm = () => {
	const userProfile = useSelector((state) => state.authReducer.userProfile);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const inputStyles = { height: "50px", width: "70%", margin: "2%" };

	const dispatch = useDispatch();
	const loginUser = async (e) => {
		e.preventDefault();
		auth.signInWithEmailAndPassword(email, password)
			.then((user) => {
				dispatch(
					setUserProfile({
						...userProfile,
					})
				);
				const SignedIn = new CustomEvent("SignedIn", {
					detail: { type: "returningUser" },
				});
				dispatchEvent(SignedIn);
			})
			.catch((error) => {
				alert(error);
			});
	};

	return (
		<React.Fragment>
			<Title style={{ margin: "2%" }}>Log In</Title>
			<form
				style={{
					width: "100%",
					height: "auto",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "space-evenly",
				}}
				onSubmit={(e) => loginUser(e)}
			>
				<FormInputLabel htmlFor="email">Email</FormInputLabel>
				<FormInputText
					style={inputStyles}
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<FormInputLabel htmlFor="password">
					Password
				</FormInputLabel>
				<FormInputText
					style={inputStyles}
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<FormInputButton style={inputStyles}>
					<ButtonText>Log In</ButtonText>
				</FormInputButton>
			</form>
		</React.Fragment>
	);
};

export default LogInForm;

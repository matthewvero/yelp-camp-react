import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SignedUp } from "../../../events/auth-events";
import { auth, db } from "../../../firebase";
import { setUser } from "../../../redux/auth-redux/auth.actions";
import {
	FormInputButton,
	FormInputLabel,
	FormInputText,
} from "../../inputs/input-text/inputs.styles";
import { ButtonText, Title } from "../../misc/text.styles";

const SignupForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();
	const inputStyles = { height: "50px", width: "70%", margin: "2%" };
	const formStyles = {
		width: "100%",
		height: "auto",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-evenly",
	};

	const handleSumbit = async (e) => {
		e.preventDefault();
		try {
			const res = await auth.createUserWithEmailAndPassword(email, password)
			await res.user
			.updateProfile({
				displayName: username,
			});
			db.collection('userProfiles').add({
				userID: res.user.uid,
				displayName: username
			}).catch(err => console.log(err))
			dispatch(
				setUser({
					...res,
					displayName: username,
				})
			);
			dispatchEvent(SignedUp);
		} catch (error) {
			return console.log(error);
		}
	}

	return (
		<React.Fragment>
			<Title style={{margin: '2%'}}>Sign Up</Title>

			<form style={formStyles} onSubmit={(e) => handleSumbit(e)}>
				<FormInputLabel htmlFor="username">
					{" "}
					Username{" "}
				</FormInputLabel>

				<FormInputText
					style={inputStyles}
					id="username"
					value={username}
					type="text"
					onChange={(e) => setUsername(e.target.value)}
				/>

				<FormInputLabel htmlFor="email">
					{" "}
					Email{" "}
				</FormInputLabel>

				<FormInputText
					style={inputStyles}
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<FormInputLabel  htmlFor="password">
					{" "}
					Password{" "}
				</FormInputLabel>

				<FormInputText
					type="password"
					style={inputStyles}
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<FormInputButton style={inputStyles}>
					<ButtonText>Sign Up</ButtonText>
				</FormInputButton>
			</form>
		</React.Fragment>
	);
};

export default SignupForm;

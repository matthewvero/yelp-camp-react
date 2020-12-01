import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth, db } from "../../../firebase";
import { updateUserProfile } from "../../../firebase.utils";
import { setUser } from "../../../redux/auth-redux/auth.actions";
import {
	FormInputButton,
	FormInputText,
} from "../../inputs/input-text/inputs.styles";
import { Title } from "../../misc/text.styles";

const SignupForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();
	const inputStyles = { height: "50px", width: "70%", margin: "2%" };
	const formStyles = {
		width: "100%",
		height: "80%",
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
			dispatch(
				setUser({
					...res,
					displayName: username,
				})
			);
			
		} catch (error) {
			return console.log(error);
		}
	}

	return (
		<React.Fragment>
			<Title style={{margin: '2%'}}>Sign Up</Title>

			<form style={formStyles} onSubmit={(e) => handleSumbit(e)}>
				<label style={{ margin: "1%" }} htmlFor="username">
					{" "}
					Username{" "}
				</label>

				<FormInputText
					style={inputStyles}
					id="username"
					value={username}
					type="text"
					onChange={(e) => setUsername(e.target.value)}
				/>

				<label style={{ margin: "1%" }} htmlFor="email">
					{" "}
					Email{" "}
				</label>

				<FormInputText
					style={inputStyles}
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<label style={{ margin: "1%" }} htmlFor="password">
					{" "}
					Password{" "}
				</label>

				<FormInputText
					type="password"
					style={inputStyles}
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<FormInputButton style={inputStyles}>
					Log In
				</FormInputButton>
			</form>
		</React.Fragment>
	);
};

export default SignupForm;

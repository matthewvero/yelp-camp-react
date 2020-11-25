import React from "react";
import { ButtonContainer } from "./button.styles";

const Button = ({ children, fn, styles }) => {
	return (
		<ButtonContainer style={styles} onClick={fn}>
			{children}
		</ButtonContainer>
	);
};

export default Button;

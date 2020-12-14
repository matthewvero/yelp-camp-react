import React, { useState } from "react";
import { ButtonContainer } from "./button.styles";

const Button = ({ children, fn, styles }) => {
	const [animated, setAnimated] = useState(false)
	const handleClick = () => {
		fn();
		setAnimated(false)
	}

	return (
		<ButtonContainer 
			style={styles}
			onMouseDown={() => setAnimated(true)}
			onMouseUp={() => handleClick()}
			animated={animated}>
			{children}
		</ButtonContainer>
	);
};

export default Button;

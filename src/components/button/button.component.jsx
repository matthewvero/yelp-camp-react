import React, { useState } from "react";
import { ButtonContainer } from "./button.styles";

const Button = ({ children, fn, style }) => {
	const [animated, setAnimated] = useState(false)
	const handleClick = () => {
		fn();
		setAnimated(false)
	}

	return (
		<ButtonContainer 
			style={style}
			onMouseDown={() => setAnimated(true)}
			onMouseUp={() => handleClick()}
			animated={animated}>
			{children}
		</ButtonContainer>
	);
};

export default Button;

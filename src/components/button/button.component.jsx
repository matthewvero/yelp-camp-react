import React from "react";
import withTouchAnimator from "../touch-hoc/touch-hoc.component";
import { ButtonContainer } from "./button.styles";

const Button = ({ $active, children, style, ...props }) => {
	
	return (
		<ButtonContainer 
			$active={$active}
			style={style}
			{...props}
		>
			{children}
		</ButtonContainer>
	);
};

export default withTouchAnimator(Button);

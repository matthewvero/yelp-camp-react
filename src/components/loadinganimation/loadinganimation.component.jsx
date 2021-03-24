import React from "react";
import {
	LoadingAnimationContainer,
	LoadingWaves,
	Wave,
} from "./loadinganimation.styles";

const LoadingAnimation = ({ transparency }) => {
	return (
		<LoadingAnimationContainer transparency={transparency}>
			<LoadingWaves>
				<Wave />
				<Wave delay="500" />
			</LoadingWaves>
		</LoadingAnimationContainer>
	);
};

export default LoadingAnimation;

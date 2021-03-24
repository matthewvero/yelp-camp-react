import styled, { keyframes } from "styled-components";

const wave = keyframes`
	0% {
		transform: scale(1);
		opacity: 1;
	}
	100% {
		transform: scale(10);
		opacity: 0;
	}
`;

export const LoadingWaves = styled.div`
	z-index: 100;
	height: 200px;
	width: 200px;
	position: fixed;
	top: 50%;
	left: 50%;
	overflow: visible;
	transform: translate(-50%, -50%);
`;

export const Wave = styled.div`
	position: absolute;
	transform: translate(-50%, -50%);
	left: 50%;
	top: 50%;
	height: 10px;
	width: 10px;
	border: 1px solid ${(props) => props.theme.color};
	border-radius: 50%;
	animation: ${wave} 1000ms linear infinite;
	animation-delay: -${(props) => (props.delay ? props.delay : "0")}ms;
`;

export const LoadingAnimationContainer = styled.div`
	z-index: 100;
	position: fixed;
	top: 0%;
	left: 0%;
	height: 100%;
	width: 100%;
	background-color: ${(props) =>
		props.transparency
			? "rgba(25, 25, 25, 0.7)"
			: props.theme.background};
`;

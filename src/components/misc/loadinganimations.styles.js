import styled, { keyframes } from "styled-components/macro";

const loading = keyframes`
0%{background-position:0% 50%}
100%{background-position:100% 50%}
`;

export const Loader = styled.div`
	height: 100%;
	width: 100%;
	animation: ${loading} 1s linear infinite forwards;
	background: linear-gradient(
		65deg,
		${(props) => props.theme.loadingDark},
		${(props) => props.theme.loadingLight},
		${(props) => props.theme.loadingDark},
		${(props) => props.theme.loadingLight}
	);
	background-size: 300% 300%;
`;

export const LoadingText = styled(Loader)`
	width: 90%;
	min-height: 10px;
	border-radius: 50px;
	margin: 5px 0;
`;

export const LoadingImage = styled(Loader)`
	min-width: 100%;
	min-height: 70%;
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

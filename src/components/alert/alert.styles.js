import styled from "styled-components";

export const AlertContainer = styled.div`
	z-index: 20;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	height: auto;
	width: auto;
	padding: 10px;
	background-color: ${(props) => props.theme.main};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: ${(props) => props.theme.borderRadius};
	box-shadow: ${(props) => props.theme.boxShadow};
	&.alert-enter {
		opacity: 0;
	}
	&.alert-enter-active {
		transition: all 200ms ease-out;
		opacity: 1;
	}
	&.alert-exit {
		opacity: 1;
	}
	&.alert-exit-active {
		transition: all 500ms ease-out;
		opacity: 0;
	}
`;

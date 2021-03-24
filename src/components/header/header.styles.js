import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components/macro";

export const HeaderContainer = styled.div`
	position: fixed;
	z-index: 1001;
	left: 0px;
	top: 0px;
	height: 65px;
	width: 100vw;
	display: flex;
	justify-content: space-between;
	background-color: ${(props) => props.theme.main};
	box-shadow: ${(props) => props.theme.boxShadowBottom};
	border-bottom: ${(props) => props.theme.border};
	padding-right: 5vw;
	box-sizing: border-box;
	@media (max-width: ${(props) => props.theme.smallBreakPoint}) {
		padding-right: 10px;
	}
`;

export const HeaderLogo = styled.div`
	color: ${(props) => props.theme.textAlt};
	width: 100px;
	height: 100%;
	padding: 0 50px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	font-size: ${(props) => props.theme.logoFontSize};
	user-select: none;
	cursor: pointer;
	&:hover {
		background-color: ${(props) => props.theme.backgroundHover};
	}
	&:active {
		background-color: ${(props) => props.theme.backgroundActive};
	}
`;

export const HeaderButton = styled.div`
	height: 40px;
	width: auto;
	min-width: 115px;
	padding: 0 10px;
	margin: 0 10px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	align-self: center;
	border-radius: 500px;
	background-color: ${(props) => {
		if (props.$active) {
			return props.theme.backgroundActive;
		} else if (props.$hovering) {
			return props.theme.backgroundHover;
		} else {
			return "transparent";
		}
	}};
	color: ${(props) => props.theme.textAlt};
	font-size: 1.3rem;
	user-select: none;
	transform: scale(${(props) => (props.$active ? "0.95" : "1")});
	cursor: pointer;
	@media (min-width: ${(props) => props.theme.smallBreakPoint}) {
		&:hover {
		}
	}

	@media (max-width: ${(props) => props.theme.smallBreakPoint}) {
		font-size: 1.1rem;
		padding: 0px;
		height: 30px;
	}
`;

export const CircleButtonContainer = styled(HeaderButton)`
	height: 50px;
	width: 50px;
	min-width: 50px;
	padding: 0;
	justify-content: space-around;
	font-size: 1.7em;
	color: ${(props) => props.theme.color};
	transform: scale(${(props) => (props.$active ? "0.95" : "1")});
	position: relative;
`;

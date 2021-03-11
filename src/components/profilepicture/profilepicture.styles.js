import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components/macro";

export const ProfilePictureContainer = styled.div`
	height: 100%;
	width: 100%;
	border-radius: 50%;
	overflow: hidden;
	position: relative;
`;

export const NoProfileImage = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: ${(props) => props.theme.textAlt};
	background-color: ${(props) => props.theme.background};
`;

export const NoProfileImageIcon = styled(FontAwesomeIcon)`
	position: absolute;
	font-size: 5rem;
	color: ${(props) => props.theme.main};
	@media (max-width: ${(props) => props.theme.smallBreakPoint}) {
		font-size: 3rem;
	}
`;

export const Switcher = styled.div`
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	position: absolute;
	cursor: pointer;
	&.switcher-enter {
		opacity: 0;
	}
	&.switcher-enter-active {
		transition: all 100ms ease-out;
		opacity: 1;
	}
	&.switcher-exit {
		opacity: 1;
	}
	&.switcher-exit-active {
		transition: all 100ms ease-out;
		opacity: 0;
	}
`;

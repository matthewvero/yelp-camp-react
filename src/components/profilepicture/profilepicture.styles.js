import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components/macro";

export const ProfilePictureContainer = styled.div`
	height: 100%;
	width: 100%;
	border-radius: 50%;
	overflow: hidden;
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
	color: ${props => props.theme.main};
  	@media (max-width: ${props => props.theme.smallBreakPoint}) {
		font-size: 3rem;
	}
`;	
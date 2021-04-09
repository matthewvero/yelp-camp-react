import styled from "styled-components/macro";
import {
	ContentContainer,
	ResponsivePageContainer,
} from "../../components/misc/containers.styles";

export const ProfilePictureResponsiveContainer = styled.div`
	height: 200px;
	width: 200px;
	position: absolute;
	left: 5%;
	bottom: -30%;
	z-index: 10;
	border: solid 5px ${(props) => props.theme.main};
	border-radius: 50%;
	@media (max-width: ${(props) => props.theme.mediumBreakPoint}) {
		height: 150px;
		width: 150px;
		left: 50%;
		transform: translateX(-50%);
		bottom: 0%;
	}
`;

export const CoverPictureResponsiveContainer = styled(ResponsivePageContainer)`
	height: 300px;
	min-height: 300px;
	margin-top: 10px;
	position: relative;
	@media (max-width: ${(props) => props.theme.smallBreakPoint}) {
		height: 200px;
		min-height: 200px;
	}
`;

export const UserNameBar = styled(ContentContainer)`
	min-height: 100px;
	position: relative;
	@media (max-width: ${(props) => props.theme.smallBreakPoint}) {
		min-height: 50px;
	}
`;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components/macro";
import { ContentContainer } from "../misc/containers.styles";

export const CampsiteCardContainer = styled(ContentContainer)`
	min-height: 400px;
	max-height: 400px;
	flex-basis: 32.5%;
	justify-content: space-between;
	align-items: start;
	overflow: hidden;
	position: relative;
	margin-bottom: 10px;
	transition: all 25ms linear;
	cursor: pointer;
	&:hover {
		transform: translateY(-5px);
	}
	@media (max-width: 1200px){
		flex-basis: 49%;
		
	}

	@media (max-width: ${props => props.theme.smallBreakPoint}){
		flex-basis: 100%;
		&:hover {
		transform: translateY(0px);
	}
	}
`;

export const CampsiteCardHeart = styled(FontAwesomeIcon)`
	&:before {
		content: " ";
		height: 10px;
		width: 10px;
		background-color: white;
	}
	color: white;
	position: absolute;
	top: 10px;
	right: 10px;
	font-size: 1.5rem;
	transition: all 0.3s;
	cursor: pointer;
	&:hover {
		transform: scale(1.2);
		color: pink;
	}
	&:active {
		color: rgb(255, 100, 100);
		transform: scale(1.4);
	}
`;

export const CampsiteCardImageContainer = styled.div`
  max-height: 65%;
  min-height: 65%;
  width: 100%;

`;
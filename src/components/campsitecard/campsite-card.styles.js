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
	@media (min-width: ${props => props.theme.mediumBreakPoint}) {
		
		transform: rotateY(${props => props.tiltX}deg) rotateX(${props => props.tiltY}deg);
		box-shadow: ${props => props.shadowX}px ${props => props.shadowY}px 2px ${props => props.theme.dynamicBoxShadow};
	}
	cursor: pointer;
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
	color: ${props => props.liked ? 'rgb(255, 100, 100)' : 'white'};
	position: absolute;
	top: 10px;
	right: 10px;
	font-size: 2rem;
	transition: all 0.3s;
	cursor: pointer;
	@media (min-width: ${props => props.theme.smallBreakPoint}){
		&:hover {
			transform: scale(1.2);
			color: pink;
		}

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
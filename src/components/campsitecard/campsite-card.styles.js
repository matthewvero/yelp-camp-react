import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components/macro";
import { ContentContainer } from "../misc/containers.styles";

export const CampsiteCardThing = styled.div`
	z-index: 3;
	height: 100px;
	width: 100px;
	position: absolute;
	top: -100px;
	right: -100px;
	background-color: ${props => props.theme.main};
	border-radius: 20%;
	transition: all 100ms ease-in;
	box-shadow: ${props => props.theme.boxShadow};
`;


export const CampsiteCardContainer = styled(ContentContainer)`
	position: relative;
	min-height: 400px;
	max-height: 400px;
	width: 100%;
	margin-bottom: 10px;
	transition: all 25ms linear;
	overflow: hidden;
	cursor: pointer;
	&:hover {
		transform: translateY(-3px);
		box-shadow: ${props => props.theme.boxShadowRaised};
	}
	&:hover ${CampsiteCardThing} {
		transform: translate(-60%, 55%);

	}
	@media (max-width: ${props => props.theme.smallBreakPoint}){
		min-height: 300px;
		max-height: 300px;
	}
`;


export const CampsiteCardHeart = styled(FontAwesomeIcon)`
	&:before {
		content: " ";
		height: 10px;
		width: 10px;
		background-color: white;
	}
	z-index: 3;
	position: absolute;
	top: 10px;
	right: 10px;
	font-size: 2rem;
	transition: all 0.3s;
	
	cursor: pointer;
	color: ${props => {
		if (props.active && !props.liked) {
			return 'rgb(255, 100, 100)'
		} else if (props.hovering){
			return 'pink'
		} else if (props.liked) {
			return 'rgb(255, 100, 100)'
		} else {
			return 'white'
		}
	}};
	transform: ${props => {
		if (props.active ) {
			return 'scale(1.2)'
		} else if (props.hovering){
			return 'scale(1.1)'
		} else {
			return 'scale(1)'
		}
	}};

`;

export const CampsiteCardImageContainer = styled.div`
	max-height: 65%;
	min-height: 65%;
	width: 100%;
	overflow: hidden;
`;


export const CardContentContainer = styled.div`
		width: 100%;
		height: 140px;
		padding: 10px 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: start;
		box-sizing: border-box;
		border-top: solid 5px ${props => props.theme.color};

`;
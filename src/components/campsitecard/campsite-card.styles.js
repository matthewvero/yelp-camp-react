import styled from "styled-components/macro";
import { ContentContainer } from "../misc/containers.styles";

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
	@media (max-width: ${props => props.theme.smallBreakPoint}){
		min-height: 300px;
		max-height: 300px;
	}
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
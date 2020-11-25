import styled from "styled-components";
import { ContentContainer } from "../misc/containers.styles";

export const CampsiteCreatorContainer = styled(ContentContainer)`
	overflow: hidden;
	position: relative;
`;

export const CampsiteCreatorPage = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	&.page-enter {
		opacity: 0;
	}
	&.page-enter-active {
		position: absolute;
		opacity: 1;
		transition: opacity 100ms;
	}
	&.page-exit {
		opacity: 1;
	}
	&.page-exit-active {
		position: absolute;
		opacity: 0;
		transition: opacity 100ms;
	}
`;

export const CampsiteCreatorInput = styled.input`
	height: 100%;
	width: 100%;
	padding: 0 10px;
	border: none;
	border-radius: 10px;
	background-color: ${(props) => props.theme.background};
	outline: none;
	font-size: 1.3rem;
	color: ${(props) => props.theme.textAlt};
	box-sizing: border-box;
`;
export const CampsiteCreatorImageInput = styled.label`
	grid-row: 1 / 3;
	display: flex;
	justify-content: space-around;
	align-items: center;
	border-radius: 10px;
	border: none;
	background-color: ${(props) => props.theme.background};
	color: ${(props) => props.theme.textAlt};
	font-size: 1.3rem;
	transition: transform 25ms linear;
	user-select: none;
	outline: none;
	cursor: pointer;
	&:hover {
		background-color: ${(props) => props.theme.backgroundHover};
	}
	&:active {
		transform: scale(0.95);
		background-color: ${(props) => props.theme.backgroundActive};
	}
`;

export const CampsiteCreatorHoverEffect = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	&:hover {
		background-color: ${(props) => props.backgroundHover};
	}
`;

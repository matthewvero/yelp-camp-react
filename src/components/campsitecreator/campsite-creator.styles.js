import styled from "styled-components/macro";
import { ContentContainer } from "../misc/containers.styles";
import { ButtonContainer } from "../button/button.styles";
export const CCContainer = styled(ContentContainer)`
	overflow: hidden;
	position: relative;
	height: 200px;
	@media (max-width: ${props => props.theme.smallBreakPoint}) {
		height:  ${props => {
		switch(props.activePage) {
			case 'create' || 'review': 
				return '400px';
			default: 
				return '100px';
		} 
	}};
	}
`;

export const CCPage = styled.div`
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
		transition: opacity 0ms;
	}
`;

export const CCGrid = styled.div`
  	height: 100%;
	padding: 10px;
	box-sizing: border-box;
	width: 100%;
	display: grid;
	grid-template-columns: minmax(213px, 25%) auto minmax(120px, 20%);
	grid-template-rows: 30% auto;
	gap: 1rem;
	@media (max-width: ${props => props.theme.smallBreakPoint}) {
		grid-template-rows: 15% 60% auto;
		grid-template-columns: 48% 48%;
		gap: 4%;
	}
`;

export const CCInput = styled.input`
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

export const CCTextArea = styled.textarea`
	width: 100%;
	border: none;
	outline: none;
	background-color: ${props => props.theme.background};
	border-radius: 10px;
	padding: 10px;
	resize: none;
	font-family: Helvetica, sans-serif;
	color: ${props => props.theme.textAlt};
	font-size: 1.3rem;
	box-sizing: border-box;
	@media (max-width: ${props => props.theme.smallBreakPoint}) {
		grid-row: 2/3;
	}
`;
export const CCImageInput = styled.label`
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
	@media (max-width: ${props => props.theme.smallBreakPoint}) {
		grid-row: 2/3;
	}
`;

export const CCImageContainer = styled.div`
	grid-row: 1 / 3;
	border-radius: 10px;
	overflow: hidden;
	@media (max-width: ${props => props.theme.smallBreakPoint}) {
		grid-row: 2/3;
	}
`;

export const CCButtonContainer = styled.div`
	grid-column: "3/4";
	grid-row: "2/3";
	display: flex;
	flex-direction: column;
	@media (max-width: ${props => props.theme.smallBreakPoint}) {
		grid-row: 3/4;
		grid-column: 1/3;
		flex-direction: row;
		justify-content: space-between;
	}

`;

export const CCButton = styled(ButtonContainer)`
  	width: 100%;
	height: 45%;
	margin-bottom: 5%;
	@media (max-width: ${props => props.theme.smallBreakPoint}) {
		width: 40%;
		height: 100%;

}
`;

export const CCHoverEffect = styled.div`
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

export const StartPageTitle = styled.span`
	width: 70%;
	font-size: 2rem;
	color: ${props => props.theme.textAlt};
	cursor: pointer;
	display: flex;
	justify-content: space-around;
	align-items: center;
	@media (max-width: ${props => props.theme.smallBreakPoint}){
		width: 95%;
		font-size: 1.6rem;
	}
`;
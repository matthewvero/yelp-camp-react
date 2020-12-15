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
			case 'create': 
				return '300px';
			case 'review': 
				return '150px';
			default: 
				return '50px';
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
		grid-template-columns: auto 50%;
            grid-template-rows: 15% auto 50%;
            padding: 5px;
            gap: 0.5rem;
            min-height: 300px;
            max-height: 300px;            
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
	@media (max-width: ${props => props.theme.smallBreakPoint}) {
		font-size: 1rem;
	}
`;

export const CCPriceInput = styled(CCInput)`
@media (max-width: ${props => props.theme.smallBreakPoint}) {
		grid-row: 1/2;
		grid-column: 2/3;
	}
`
export const CCTitleInput = styled(CCInput)`
	@media (max-width: ${props => props.theme.smallBreakPoint}) {
		grid-row: 1/2;
		grid-column: 1/2;
	}
`

export const CCTextArea = styled.textarea`
	grid-row: 2/3;
	grid-column: 2/3;
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
		font-size: 1rem;
		grid-row: 2/3;
		grid-column: 1/3;
	}
`;
export const CCImageInput = styled.label`
	height: 100%; 
	display: flex;
	justify-content: space-around;
	align-items: center;
	border-radius: 10px;
	border: none;
	background-color: ${(props) => props.animated ? props.theme.background.active : props.theme.background};
	color: ${(props) => props.theme.textAlt};
	font-size: 1.3rem;
	transition: transform 25ms linear;
	user-select: none;
	outline: none;
	grid-row: 1/3;
	cursor: pointer;
	&:hover {
		background-color: ${(props) => props.theme.backgroundHover};
	}
	transform: ${props => props.animated ? `scale(0.95)` : `scale(1)`};

	@media (max-width: ${props => props.theme.smallBreakPoint}) {
		grid-row: 3/4;
	}
`;

export const CCImageContainer = styled.div`
	grid-row: 1 / 3;
	border-radius: 10px;
	overflow: hidden;
	@media (max-width: ${props => props.theme.smallBreakPoint}) {
		grid-row: 3/4;
	}
	
`;

export const CCButtonContainer = styled.div`
	grid-row: 2/3;
	grid-column: 3/4;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	@media (max-width: ${props => props.theme.smallBreakPoint}) {
		grid-row: 3/4;
		grid-column: 2/3;
	}
`;

export const CCButton = styled(ButtonContainer)`
  	width: 100%;
	height: 45%;
	@media (max-width: ${props => props.theme.smallBreakPoint}) {
		width: 100%;
		height: 45%;
		font-size: 1rem;

	}
`;

export const CCReviewButton = styled(CCButton)`
	@media (max-width: ${props => props.theme.smallBreakPoint}) {
		width: 100%;
		height: 100%;
		font-size: 1rem;

	}
`

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
		justify-content: space-between;
		padding: 0 20px;
	}
`;

export const CCReviewGrid = styled.div`
	height: 100%;
      width: 100%;
      padding: 5px;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: minmax(213px, 25%) auto minmax(120px, 20%);
      grid-template-rows: 30% auto;
      gap: 1rem;
      background-color: ${props => props.theme.main};
      border-radius: ${props => props.theme.borderRadius};
      box-shadow: ${props => props.theme.boxShadow};
      @media (max-width: ${props => props.theme.smallBreakPoint}) {
		grid-template-columns: 100px 45% auto;
            grid-template-rows: 70% auto;
            padding: 5px;
            gap: 0.5rem;
            min-height: 150px;
            max-height: 150px;            
	}
`

export const CCReviewButtonContainer = styled.div`
	grid-row: 2/3;
	grid-column: 3/4;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	@media (max-width: ${props => props.theme.smallBreakPoint}) {
		grid-row: 2/3;
		grid-column: 1/4;
		flex-direction: row;
	}
`;

export const CCReviewImageContainer = styled.div`
	width: 100%;
	height: 100%;
	grid-row: 1/3;
	border-radius: 10px;
	overflow: hidden;
	@media (max-width: ${props => props.theme.smallBreakPoint}) {
		grid-row: 1/2;
	}
`
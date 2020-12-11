import styled from "styled-components/macro";

export const ButtonContainer = styled.button`
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

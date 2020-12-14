import styled from "styled-components/macro";

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	border-radius: 10px;
	background-color: ${(props) => props.animated ? props.theme.backgroundActive : props.theme.background};
	color: ${(props) => props.theme.textAlt};
	font-size: 1.3rem;
	transition: all 100ms linear;
	user-select: none;
	outline: none;
	cursor: pointer;
	@media (min-width: ${props => props.theme.mediumBreakPoint}) {
		&:hover {
			background-color: ${(props) => props.theme.backgroundHover};
		}
	}
	${props => console.log(props)}
`;

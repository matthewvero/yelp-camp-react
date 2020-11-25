import styled from "styled-components/macro";
import { HeaderButton } from "../header/header.styles";

export const ThemeToggleButtonContainer = styled(HeaderButton)`
	height: 50px;
	width: 50px;
	min-width: 50px;
	padding: 0;
	justify-content: space-around;
	font-size: 1.7em;
	color: ${(props) => props.theme.color};
`;

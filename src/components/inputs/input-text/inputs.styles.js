import styled from "styled-components/macro";

export const FormInputLabel = styled.label`
	position: absolute;
	left: 15%;
	user-select: none;
	opacity: ${(props) => (props.$focus ? "0" : "1")};
	transition: opacity 100ms;
	color: ${(props) => props.theme.textAlt};
	font-size: 1.3rem;
	cursor: text;
`;

export const FormInputText = styled.input`
	width: auto;
	padding: 0 20px 0 40px;
	font-size: 1.3rem;
	background-color: ${(props) => props.theme.background};
	color: ${(props) => props.theme.textAlt};
	border: none;
	border-radius: 10px;
	outline: none;
	@media (max-width: ${(props) => props.theme.xSmallBreakPoint}) {
		font-size: 1rem;
	}
`;

export const FormInputTextArea = styled.textarea`
	width: 100%;
	font-size: 1.3rem;
	box-sizing: border-box;
	background-color: ${(props) => props.theme.background};
	color: ${(props) => props.theme.textAlt};
	border: none;
	border-radius: 10px;
	outline: none;
	font-family: Helvetica, sans-serif;
	resize: none;
`;

export const FormInputButton = styled.button`
	padding: 0 20px;
	border: none;
	border-radius: 10px;
	background-color: ${(props) => props.theme.color};
	color: ${(props) => props.theme.btnColor};
	outline: none;
	font-size: 1.3rem;
	font-weight: 400;
	cursor: pointer;
	&:hover {
		background-color: ${(props) => props.theme.colorHover};
	}
	&:active {
		background-color: ${(props) => props.theme.colorActive};
		transform: scale(0.9);
	}
`;

export const UpdateImageButtonContainer = styled.label`
	z-index: 10;
	position: absolute;
	bottom: 10px;
	right: 10px;
	height: 50px;
	width: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${(props) => props.theme.backgroundTransparent};
	font-size: 2rem;
	color: white;
	transition: all 50ms linear;
	border-radius: 50%;
	cursor: pointer;
	&:hover {
		transform: scale(1.1);
		background-color: ${(props) =>
			props.theme.backgroundTransparentActive};
	}
`;

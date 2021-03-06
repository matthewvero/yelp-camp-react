import styled from "styled-components/macro";

export const PageContainer = styled.div`
	min-width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${(props) => props.theme.background};
	padding-top: 66px;
	box-sizing: border-box;
	overflow: scroll;
	scroll-padding-top: 80px;
	scroll-behavior: smooth;
`;

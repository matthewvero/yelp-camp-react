import styled from "styled-components/macro";
export const CoverPictureContainer = styled.div`
	height: 100%;
	width: 100%;
	border-radius: 10px;
	position: relative;
	overflow: hidden;
	box-shadow: ${(props) => props.theme.boxShadow};
`;

export const NoCoverPicture = styled.div`
	height: 100%;
	width: 100%;
	overflow: hidden;
`;

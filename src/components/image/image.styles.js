import styled from "styled-components/macro";

export const ImageContainer = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
	box-sizing: content-box;
	overflow: hidden;
`;

export const ImageSwitcher = styled.div`
	width: 100%;
	height: 100%;
	&.image-enter {
		opacity: 0;
	}
	&.image-enter-active {
		position: relative;
		transition: 500ms opacity;
		opacity: 1;
	}
	&.image-exit {
		opacity: 1;
	}
	&.image-exit-active {
		position: relative;
		transition: 500ms opacity;
		opacity: 0;
	}
`;

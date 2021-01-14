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
	z-index: 2;
	position: absolute;

	&.image-enter {
		opacity: 0;
	}
	&.image-enter-active {
		transition: opacity 500ms;
		opacity: 1;
	}
	&.image-exit {
		opacity: 1;
	}
	&.image-exit-active {
		transition: opacity 500ms;
		opacity: 0;
	}
`;

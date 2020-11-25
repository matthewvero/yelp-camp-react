import styled from "styled-components";

export const ImageContainer = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
`;

export const ImageSwitcher = styled.div`
	width: 100%;
	height: 100%;
	&.image-enter {
		opacity: 0;
	}
	&.image-enter-active {
		position: absolute;
		transition: 500ms opacity;
		opacity: 1;
	}
	&.image-exit {
		opacity: 1;
	}
	&.image-exit-active {
		position: absolute;
		transition: 500ms opacity;
		opacity: 0;
	}
`;

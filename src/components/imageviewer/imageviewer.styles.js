import styled from "styled-components";

export const ImageViewerContainer = styled.div`
	z-index: 20;
	position: fixed;
	top: 50%;
	left: 50%;
	height: 100%;
	width: 100%;
	transform: translate(-50%, -50%);
	display: grid;
	place-items: center;
	background-color: rgba(20, 20, 20, 0.7);
	border-radius: ${(props) => props.theme.borderRadius};
	&.imageviewer-enter {
		opacity: 0;
	}
	&.imageviewer-enter-active {
		transition: all 200ms ease-out;
		opacity: 1;
	}
	&.imageviewer-exit {
		opacity: 1;
	}
	&.imageviewer-exit-active {
		transition: all 100ms ease-out;
		opacity: 0;
	}
`;

export const ImageViewerContent = styled.div`
	height: 75%;
	width: 50%;
`;

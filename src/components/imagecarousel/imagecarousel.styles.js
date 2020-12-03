import styled, { keyframes } from "styled-components/macro";

export const ImageCarouselContainer = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0px;
	left: 0px;
	z-index: 0;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ImageCarouselSlide = styled.div`
	min-height: 100%;
	min-width: 100%;
	position: absolute;
	object-fit: cover;
	object-position: center;
	&.image-enter {
		opacity: 0;
	}
	&.image-enter-active {
		opacity: 1;
		transition: opacity 2s;
	}
	&.image-exit {
		opacity: 1;
	}
	&.image-exit-active {
		opacity: 0;
		transition: opacity 2s;
	}
`;
export const Fader = styled.div`
	min-height: 100%;
	min-width: 100%;
	position: absolute;
	object-fit: cover;
	object-position: center;
	animation: ${fadeIn} 1s forwards 1;
`;

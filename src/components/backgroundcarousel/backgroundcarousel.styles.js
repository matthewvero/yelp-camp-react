import styled, { keyframes } from "styled-components/macro";

export const BackgroundCarouselContainer = styled.div`
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

export const BackgroundCarouselSlide = styled.div`
	min-height: 100%;
	min-width: 100%;
	position: absolute;
	object-fit: cover;
	object-position: center;
	&.background-enter {
		opacity: 0;
	}
	&.background-enter-active {
		opacity: 1;
		transition: opacity 2s;
	}
	&.background-exit {
		opacity: 1;
	}
	&.background-exit-active {
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

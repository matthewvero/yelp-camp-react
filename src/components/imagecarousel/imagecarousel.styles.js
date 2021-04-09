import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components/macro";

export const ImageCarouselContainer = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
	border-radius: 10px;
	overflow: hidden;
	background-color: ${(props) => props.theme.main};
`;

export const ImageCarouselSlide = styled.div`
	height: 100%;
	width: 100%;
	min-height: 100%;
	min-width: 100%;
	position: absolute;
	user-select: none;
	will-change: transform;
	z-index: 0;
	opacity: 0;
	background-color: ${(props) => props.theme.main};
	&.imagecarousel-enter {
		transform: translateX(${(props) => props.enter});
		opacity: 1;
		z-index: 2;
	}
	&.imagecarousel-enter-active {
		transition: all 300ms linear;
		transform: translateX(0%);
		opacity: 1;
		z-index: 2;
	}
	&.imagecarousel-enter-done {
		z-index: 2;
		opacity: 1;
	}
	&.imagecarousel-exit {
		z-index: 1;
		opacity: 1;
	}
	&.imagecarousel-exit-done {
		z-index: 0;
	}
`;

export const ImageCarouselLoaderSlide = styled(ImageCarouselSlide)`
	&.imagecarousel-enter {
		transform: translateX(${(props) => props.enter});
		opacity: 1;
		z-index: 2;
	}
	&.imagecarousel-enter-active {
		transition: all 10ms linear;
		transform: translateX(0%);
		opacity: 1;
		z-index: 2;
	}
	&.imagecarousel-enter-done {
		z-index: 2;
		opacity: 1;
	}
	&.imagecarousel-exit {
		z-index: 1;
		opacity: 1;
	}
	&.imagecarousel-exit-done {
		z-index: 0;
	}
`;

export const ImageCarouselBtn = styled(FontAwesomeIcon)`
	position: absolute;
	height: 50px;
	width: 50px;
	z-index: 5;
	font-size: 2rem;
	color: white;
	padding: 20px 30px;
	border-radius: ${(props) => props.theme.borderRadius};
	cursor: pointer;
	&:hover {
		background-color: rgba(50, 50, 50, 0.3);
	}
`;

export const ImageCarouselBtnForward = styled(ImageCarouselBtn)`
	right: 10%;
	top: 50%;
	transform: translateY(-50%);
`;

export const ImageCarouselBtnBack = styled(ImageCarouselBtn)`
	left: 10%;
	top: 50%;
	transform: translateY(-50%);
`;

export const ImageCarouselSlideIndicator = styled.div`
	height: 15px;
	width: 5px;
	background-color: ${(props) => props.theme.color};
	border-radius: 2px;
	margin: 0 10px;
	transform: scaleY(
		${(props) => {
			const { activeImage, idx, arrLength } = props;
			const arrayLength = arrLength - 1;
			if (props.activeImage === props.idx) {
				return "1.6";
			} else if (activeImage > idx) {
				const increments = 1 / activeImage;
				const height = increments * idx;
				return 0.5 + height;
			} else if (activeImage < idx) {
				const increments = 1 / (arrayLength - activeImage);
				const height = increments * (arrayLength - idx);
				return 0.5 + height;
			}
		}}
	);
	transition: transform 100ms ease-out;
	cursor: pointer;
`;

export const ImageCarouselSlideIndicatorGroup = styled.div`
	position: absolute;
	z-index: 5;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	align-items: center;
	height: 35px;
	border-radius: 10px;
	transition: transform 100ms ease-out;
	backdrop-filter: blur(20px);
	background-color: rgba(50, 50, 50, 0.2);
	&:hover {
		transform: scale(2) translateX(-25%);
	}
`;

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


// export const PrevSlideButton = styled(SlideButton)`
// 	left: 50px;
// 	top: 50%;
// 	transform: translateY(-50%);
// `;

// export const NextSlideButton = styled(SlideButton)`
// 	right: 50px;
// 	top: 50%;
// 	transform: translateY(-50%);
// `;

// export const Slide = styled.div`
// 	scroll-snap-align: start;
// 	object-fit: cover;
// 	position: relative;
// 	width: 100%;
// 	height: 100%;
// 	&:target:before{
// 		content: " ";
// 		display: block;
// 		height: -90px; /* fixed header height*/
// 		margin: 90px 0 0; /* negative fixed header height */
// 	}

// `;


// const popup = keyframes`
//       0% {
//             transform: translateX(-50%) translateY(100%);
//       }
//       100% {
//             transform: translateX(-50%) translateY(0%);
//       }
// `

// export const PageIndicatorGroup = styled.div`
//       z-index: 5;
//       position: absolute;
//       left: 50%;
//       transform: translateX(-50%);
//       bottom: 0;
//       height: 15px;
//       display: flex;
//       align-items: center;
//       padding: 5px 5px;
//       background-color: rgba(50, 50, 50, 0.5);;
//       border-top-left-radius: 10px;
//       border-top-right-radius: 10px;
//       animation: ${popup} 200ms linear 1;
// 	@media (max-width: ${props => props.theme.mediumBreakPoint}) {
// 		top: 0px;
// 		border-top-left-radius: 0px;
// 		border-top-right-radius: 0px;
// 		border-bottom-left-radius: 10px;
//       	border-bottom-right-radius: 10px;
// 	}

// `



export const PageIndicator = styled.div`
      z-index: 5;
      height: 10px;
      width: 10px;
      margin: 10px;
      border-radius: 50%;
      border: solid 2px white;
      background-color: ${props => props.activePage === props.page ? 'white' : null};
`
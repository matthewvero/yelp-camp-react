import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { keyframes } from "styled-components/macro";

/* 
      LAY OUT CONTAINERS AT THE BOTTOM
------------------------------------------
      AESTHETIC CONTAINERS 
*/
export const ContentContainer = styled.div`
	background-color: ${(props) => props.theme.main};
	border-radius: ${(props) => props.theme.borderRadius};
	box-shadow: ${(props) => props.theme.boxShadow};
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	height: 100%;
	width: 100%;
	box-sizing: border-box;
`;

const animation = keyframes`
  from {
    transform: translateX(-50%) scaleY(0);
  }

  to {
    transform: translateX(-50%) scaleY(1);
  }
`;

export const DropdownContainer = styled.div`
	position: absolute;
	left: 50%;
	bottom: -${(props) => props.height + 60}px;
	height: ${(props) => props.height}px;
	width: 350px;
	padding: 20px 0;
	transform: translateX(-50%);
	transform-origin: top;
	background-color: ${(props) => props.theme.main};
	border-radius: ${(props) => props.theme.borderRadius};
	box-shadow: ${(props) => props.theme.boxShadow};
	animation: ${animation} 100ms linear 1;
	overflow: hidden;
	will-change: height;
`;

export const DropDownMenuPage = styled.div`
	height: auto;
	width: 100%;
	padding: 10px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	&.menu-enter {
		opacity: 0;
	}
	&.menu-enter-active {
		transition: 100ms opacity 50ms;
		opacity: 1;
	}
	&.menu-exit {
		opacity: 1;
	}
	&.menu-exit-active {
		transition: 100ms opacity 50ms;
		opacity: 0;
	}
`;

// LAYOUT CONTAINERS
export const ResponsivePageContainer = styled.div`
	height: auto;
	min-height: 50px;
	width: 80vw;
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	@media (max-width: ${(props) => props.theme.extraLargeBreakPoint}) {
		width: 98vw;
	}
	@media (max-width: ${(props) => props.theme.mediumBreakPoint}) {
		width: 95vw;
	}
`;

export const ResponsiveContentContainer = styled.div`
	width: ${(props) => (props.$width ? props.$width : "auto")};
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 300px;
	@media (max-width: ${(props) => props.theme.largeBreakPoint}) {
		width: 100%;
		margin: 5px 0;
	}
	@media (max-width: ${(props) => props.theme.mediumBreakPoint}) {
		min-height: auto;
	}
	&:before {
		content: " ";
		display: table;
	}
	&:after {
		content: " ";
		display: table;
	}
`;

export const CollapsibleContainer = styled(ContentContainer)`
	height: ${(props) => (props.collapsed ? "100px" : "auto")};
	overflow: hidden;
	@media (max-width: ${(props) => props.theme.smallBreakPoint}) {
		height: ${(props) => (props.collapsed ? "50px" : "auto")};
	}
`;

export const CollapsibleContainerTitleBar = styled.div`
	min-height: 100px;
	min-width: 100%;
	margin-top: -20px;
	margin-left: -20px;
	margin-bottom: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
	border-radius: 10px;
	user-select: none;
	cursor: pointer;
	&:hover {
		background-color: ${(props) => props.theme.backgroundHover};
	}
	@media (max-width: ${(props) => props.theme.smallBreakPoint}) {
		min-height: 50px;
	}
`;

export const CollapsibleContainerIcon = styled(FontAwesomeIcon)`
	transform: rotateZ(${(props) => (props.collapsed ? "180deg" : "0deg")});
	transition: transform 100ms linear;
	color: ${(props) => props.theme.color};
	@media (max-width: ${(props) => props.theme.smallBreakPoint}) {
		font-size: 1.6rem;
	}
	font-size: 2rem;
`;

export const HR = styled.hr`
	width: 90%;
	border: solid 1px ${(props) => props.theme.main};
`;

export const CommunityContentSection = styled.div`
	height: 100%;
	width: 100%;
	background-color: ${(props) => props.theme.background};
	padding: 20px;
	border-radius: 10px;
	display: "flex";
	flex-direction: column;
	align-items: flex-start;
	overflow-y: scroll;
	text-align: left;
	box-sizing: border-box;
`;

import styled from "styled-components/macro";

export const MainMenuContainer = styled.div`
	z-index: 1000;
	position: fixed;
	right: 0px;
	top: 0px;
	width: 500px;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 75px;
	backdrop-filter: blur(50px);
	box-shadow: 0 10px 5px ${(props) => props.theme.shadowColor};
	overflow-y: scroll;
	background-color: ${(props) => props.theme.mainMenuItemBackground};
	will-change: opacity;

	&.mainMenu-enter {
		opacity: 0;
	}
	&.mainMenu-enter-active {
		transition: all 100ms ease-out;
		opacity: 1;
	}
	&.mainMenu-exit {
		opacity: 1;
	}
	&.mainMenu-exit-active {
		transition: all 100ms ease-out;
		opacity: 0;
	}
	@media (max-width: ${(props) => props.theme.smallBreakPoint}) {
		width: 100vw;
	}
`;

export const MainMenuButtonContainer = styled.div`
	width: auto;
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	@media (max-width: 400px) {
		flex-direction: column;
		align-items: start;
		justify-content: space-around;
	}
`;

export const MainMenuItem = styled.div`
	width: 95%;
	height: 50px;
	border-radius: ${(props) => props.theme.borderRadius};
	display: flex;
	flex-direction: row;
	justify-content: start;
	align-items: center;
	padding: 0 5%;
	margin: 5px 2.5%;
	cursor: pointer;
	background-color: ${(props) => props.$active && "rgba(50,50,50, 0.5)"};
	box-sizing: border-box;
	@media (min-width: ${(props) => props.theme.smallBreakPoint}) {
		&:hover {
			background-color: ${(props) => props.theme.mainMenuItemHover};
		}
	}
`;

export const MMProfile = styled.div`
	height: 150px;
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	padding-right: 20px;
	@media (max-width: ${(props) => props.theme.smallBreakPoint}) {
		height: 125px;
	}
`;

export const MMProfileSection = styled.div`
	height: 100%;
	width: 65%;
	position: relative;
`;

export const Page = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	box-sizing: border-box;

	&.mainMenuPage-enter {
		opacity: 0;
	}
	&.mainMenuPage-enter-active {
		position: absolute;
		opacity: 1;
		transition: opacity 100ms;
	}
	&.mainMenuPage-exit {
		opacity: 1;
	}
	&.mainMenuPage-exit-active {
		position: absolute;
		opacity: 0;
		transition: opacity 100ms;
	}
`;

export const MainMenuContentSection = styled.div`
	height: 500px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	position: relative;
	box-sizing: border-box;
`;

export const MainMenuProfilePicture = styled.div`
	width: 125px;
	height: 125px;
	margin: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.background};
	border-radius: 50%;
	overflow: hidden;
	@media (max-width: ${(props) => props.theme.smallBreakPoint}) {
		width: 100px;
		height: 100px;
	}
`;

import styled from 'styled-components/macro';

export const MainMenuContainer = styled.div`
      z-index: 8;
      position: fixed;
      right: 0px;
      top: 0px;
      width: 500px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      padding-top: 75px;
      background-color: ${props => props.theme.main};
      box-shadow: 0 20px 10px ${props => props.theme.shadowColor};
      overflow-y: scroll;
      &.mainMenu-enter {
		transform: translateX(100%);
	}
	&.mainMenu-enter-active {
            transition: all 100ms ease-out;
		transform: translateX(0%);
	}
	&.mainMenu-exit {
		transform: translateX(0%);
	}
	&.mainMenu-exit-active {
            transition: all 100ms ease-out;
		transform: translateX(100%);
      }
      @media (max-width: ${props => props.theme.smallBreakPoint}) {
		width: 100vw;
	}
`;

export const MainMenuItem = styled.div`
      width: 100%;
      height: 100px;
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
`;

export const MMDivider = styled.hr`
      width: 90%;
      background: linear-gradient(90deg, ${props => props.theme.backgroundAlt} 0%, ${props => props.theme.backgroundActive}, ${props => props.theme.backgroundAlt} 100%);
      height: 1px;
      border-radius: 2px;
      border: none;
`

export const MMProfile = styled(MainMenuItem)`
      height: 150px;
      @media (max-width: ${props => props.theme.smallBreakPoint}) {
	      height: 125px;
	}
`;

export const MMProfileSection = styled.div`
      height: 100%;
      width: 65%;
      position: relative;
`

export const Page = styled.div`
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
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
	background-color: ${props => props.theme.background};
	border-radius: 50%;
      overflow: hidden;
      @media (max-width: ${props => props.theme.smallBreakPoint}) {
		width: 100px;
	      height: 100px;
	}
`
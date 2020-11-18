import styled from 'styled-components/macro';

export const HeaderContainer = styled.div`
  position: fixed; 
  z-index: 5;
  left: 0px;
  top: 0px;
  height: 65px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.main};
  box-shadow: ${props => props.theme.boxShadowBottom};
  border-bottom: ${props => props.theme.border};
`;

export const HeaderLogo = styled.div`
      color: ${props => props.theme.textAlt};
      width: 10%;
      height: 100%;
      padding: 0 50px;
      display: flex; 
      justify-content: space-around;
      align-items: center;
      font-size: ${props => props.theme.logoFontSize};
      user-select: none;
      cursor: pointer;
      &:hover {
            background-color: ${props => props.theme.backgroundHover}; 
      }
      &:active {
            background-color: ${props => props.theme.backgroundActive}
      }
`;

export const HeaderButton = styled.div`
      height: 40px;
      width: auto;
      min-width: 115px;
      padding: 0 10px;
      margin: 0 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      align-self: center;
      border-radius: 500px; 
      background-color: ${props => props.theme.backgroundAlt}; 
      color: ${props => props.theme.textAlt};
      font-size: 1.3rem;
      transition: transform 25ms linear;
      user-select: none;
      cursor: pointer;
      &:hover {
            background-color: ${props => props.theme.backgroundHover}; 
      }
      &:active {
            background-color: ${props => props.theme.backgroundActive}
      }
      &.headerbutton-enter {
            opacity: 0;
      }
      &.headerbutton-enter-active {
            transition: 100ms opacity 50ms; 
            opacity: 1;
      }
      &.headerbutton-exit {
            opacity: 1;
      }
      &.headerbutton-exit-active {
            transition: 100ms opacity 50ms; 
            opacity: 0;
      }
`
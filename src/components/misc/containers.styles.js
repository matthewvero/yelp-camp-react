import styled, { keyframes } from 'styled-components/macro';

export const Container = styled.div`
      width: ${props => props.$width};
      height: ${props => props.$height};
      background-color: ${props => props.theme.main};
      border-radius: ${props => props.theme.borderRadius};
      box-shadow: ${props => props.theme.boxShadow};
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
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
      bottom: -${props => props.height + 60}px;
      height: ${props => props.height}px;
      width: 20vw;
      padding: 20px 0;
      transform: translateX(-50%);
      transform-origin: top;
      background-color: ${props => props.theme.main};
      border-radius: ${props => props.theme.borderRadius};
      box-shadow: ${props => props.theme.boxShadow};
      animation: ${animation} 100ms linear 1;
      overflow: hidden;
      will-change: height;
`

export const DropdownMenuSlider = styled.div`
      height: auto;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      &.slider-enter {
            transform: translateX(100%);
      }
      &.slider-enter-active {
            transition: 100ms transform 25ms; 
            transform: translateX(0%);
      }
      &.slider-exit {
            opacity: 1;
      }
      &.slider-exit-active {
            opacity: 0;
            transition: 100ms opacity;
      }
`;

export const DropdownMenuInitial = styled(DropdownMenuSlider)`
      &.menu-enter {
            opacity: 0;
      }
      &.menu-enter-active {
            transition: 100ms opacity 50ms; 
            opacity: 1;
      }
      &.menu-exit {
            transform: translateX(0%);
      }
      &.menu-exit-active {
            transform: translateX(-100%);
            transition: 100ms transform;
      }
`
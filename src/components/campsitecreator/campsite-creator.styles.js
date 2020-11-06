import styled from 'styled-components';
import { Container } from '../misc/containers.styles';

export const CampsiteCreatorContainer = styled(Container)`
  overflow: hidden;
  position: relative;
`;

export const CampsiteCreatorPage = styled.div`
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 0 15px;
      box-sizing: border-box;
     
      &.page-enter {
            transform: translateX(100%);
      }
      &.page-enter-active {
            position: absolute;
            transition: transform 200ms; 
            transform: translateX(0%);      
      }
      &.page-exit {
            transform: translateX(0%);    
      }
      &.page-exit-active {
            position: absolute;
            transition: transform 200ms; 
            transform: translateX(-100%);   
      }
`;


export const CampsiteCreatorInput = styled.input`
      height: 50px;
      width: 70%;
      padding: 0 10px;
      border: none;
      border-radius: 10px;
      background-color: ${props => props.theme.background};
      outline: none;
      font-size: 1.3rem;
      color: ${props => props.theme.textAlt};
      box-sizing: border-box;
`
export const CampsiteCreatorImageInput = styled.label`
      height: 175px;
      width: 175px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-radius: 10px; 
      border: none;
      background-color: ${props => props.theme.background}; 
      color: ${props => props.theme.textAlt};
      font-size: 1.3rem;
      transition: transform 25ms linear;
      user-select: none;
      outline: none;
      cursor: pointer;
      &:hover {
            background-color: ${props => props.theme.backgroundHover}; 
      }
      &:active {
            transform: scale(0.95);
            background-color: ${props => props.theme.backgroundActive}
      }
`
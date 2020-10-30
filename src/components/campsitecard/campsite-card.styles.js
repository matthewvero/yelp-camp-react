import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { keyframes } from 'styled-components';
import { Container } from '../misc/containers.styles';

export const CampsiteCardContainer = styled(Container)`
  height: 300px;
  flex-basis: 30%; 
  margin: 1.5%; 
  justify-content: space-between; 
  align-items: start;
  overflow: hidden; 
  position: relative;
  transition: all 25ms linear;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);

  }

`;

export const CampsiteCardImage = styled.img`
  width: 100%;
  height: 70%;
  object-fit: cover;
  justify-self: start;
`

export const CampsiteCardHeart = styled(FontAwesomeIcon)`
    &:before {
      content: 'f';
      height: 10px;
      width: 10px;
      background-color: white;
    }
    color: white;
    position: absolute; 
    top: 10px; 
    right: 10px; 
    font-size: 1.5rem;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
      color: pink;
    }
    &:active {
      color: rgb(255, 100, 100);
      transform: scale(1.4);
    }
`

const loading = keyframes`
  0%{background-position:0% 50%}
  100%{background-position:100% 50%}
`

const loader = styled.div`
  animation: ${loading} 7s linear infinite forwards;
  background: linear-gradient(270deg, ${props => props.theme.loadingDark}, ${props => props.theme.loadingLight}, ${props => props.theme.loadingDark}, ${props => props.theme.loadingLight});
  background-size: 300% 300%;
`

export const LoadingText = styled(loader)`
  width: 90%;
  min-height: 10px;
  border-radius: 50px;
  margin: 5px 0;
`

export const LoadingImage = styled(loader)`
  min-width: 100%;
  min-height: 70%;
  
`


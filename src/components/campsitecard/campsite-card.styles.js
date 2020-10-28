import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Container } from '../misc/containers.styles';

export const CampsiteCardContainer = styled(Container)`
  height: auto;
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
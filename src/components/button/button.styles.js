import styled from 'styled-components';

export const ButtonContainer = styled.div`
      height: 40px;
      width: auto;
      min-width: 115px;
      padding: 0 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      align-self: center;
      border-radius: 15px; 
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
            transform: scale(0.95);
            background-color: ${props => props.theme.backgroundActive}
      }
`;
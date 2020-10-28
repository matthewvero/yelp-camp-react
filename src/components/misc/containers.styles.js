import styled from 'styled-components/macro';

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
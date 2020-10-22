import styled from 'styled-components';

export const ButtonContainer = styled.div`
  width: 200px;
  height: 50px;
  color: white;
  background-color: #444444;
  border: 1px solid rgba(200,200,200, 0.7);
  
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #555555;
  }
`;
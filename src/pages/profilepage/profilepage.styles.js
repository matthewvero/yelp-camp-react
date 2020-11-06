import styled from 'styled-components';

export const EditButton = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(50, 50, 50, 0.5);
  font-size: 2rem;
  color: white;
  transition: all 50ms linear;
  cursor: pointer;
  &:hover {
        transform: scale(1.1);
        background-color: rgba(50, 50, 50, 0.7);
  }
`;
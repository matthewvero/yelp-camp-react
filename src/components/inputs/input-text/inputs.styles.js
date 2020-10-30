import styled from 'styled-components/macro';

export const FormInputText  = styled.input`
      width: auto;
      padding: 0 20px 0 40px;
      font-size: 1.3rem;
      background-color: ${props => props.theme.background};
      color: ${props => props.theme.textAlt};
      border: none;
      border-radius: 10px;
      outline: none;      

`;

export const FormInputButton = styled.button`
      padding: 0 20px;
      border: none;
      border-radius: 10px;
      background-color: ${props => props.theme.color};
      color: ${props => props.theme.btnColor};
      outline: none;
      font-size: 1.3rem;
      font-weight: 400;
      cursor: pointer;
      &:hover {
            background-color: ${props => props.theme.colorHover}''
      }
      &:active {
            background-color: ${props => props.theme.colorActive};
            transform: scale(0.9);
      }
`;

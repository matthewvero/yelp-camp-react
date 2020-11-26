import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: ${props => props.theme.textAlt};
  margin: 0;

`;

export const SubTitle = styled.h2`
      font-size: 1.5rem;
      font-weight: 600;
      color: ${props => props.theme.textAlt};
      margin: 0;
`;

export const SectionTitle = styled.h3`
      font-size: 1.3rem;
      font-weight: 600;
      color: ${props => props.theme.textAlt};
      margin: 0;
`

export const ButtonText = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  color: ${props => props.theme.textAlt};
  margin: 0;
`;

export const Text = styled.p`
  font-size: 1.3rem;
  font-weight: 400;
  color: ${props => props.theme.textAlt};
  margin: 0;
`;
import styled from 'styled-components/macro';

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: ${props => props.theme.textAlt};
  margin: 0;
  @media (max-width: ${props => props.theme.smallBreakPoint}) {
            font-size: 1.3rem;
	    }
`;

export const SubTitle = styled.h2`
      font-size: 1.5rem;
      font-weight: 600;
      color: ${props => props.theme.textAlt};
      margin: 0;
      @media (max-width: ${props => props.theme.smallBreakPoint}) {
            font-size: 1.1rem;
	    }
`;

export const SectionTitle = styled.h3`
      font-size: 1.3rem;
      font-weight: 600;
      color: ${props => props.theme.textAlt};
      margin: 0;
      @media (max-width: ${props => props.theme.smallBreakPoint}) {
            font-size: 0.9rem;
	    }
`

export const ButtonText = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  color: ${props => props.theme.textAlt};
  margin: 0;
  @media (max-width: ${props => props.theme.smallBreakPoint}) {
            font-size: 1rem;
	}
`;

export const Text = styled.p`
  font-size: 1.3rem;
  font-weight: 400;
  color: ${props => props.theme.textAlt};
  margin: 0;
  @media (max-width: ${props => props.theme.smallBreakPoint}) {
            font-size: 0.9rem;
	    }
`;

export const SubText = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${props => props.theme.subText};
  margin: 0;
  @media (max-width: ${props => props.theme.smallBreakPoint}) {
            font-size: 0.8rem;
	    }
`;
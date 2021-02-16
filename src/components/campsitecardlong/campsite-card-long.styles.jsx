import styled from 'styled-components';
import { SubTitle } from '../misc/text.styles';

export const CampsiteCardLongContainer = styled.div`
      min-height: 200px;
      max-height: 200px;
      width: 100%;
      padding: 5px;
      margin-bottom: 10px;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: minmax(213px, 25%) auto minmax(120px, 20%);
      grid-template-rows: 30% auto;
      gap: 1rem;
      background-color: ${props => props.theme.main};
      border-radius: ${props => props.theme.borderRadius};
      box-shadow: ${props => props.theme.boxShadow};
      cursor: pointer;
      @media (max-width: ${props => props.theme.smallBreakPoint}) {
		grid-template-columns: 100px 45% auto;
            grid-template-rows: 70% auto;
            padding: 5px;
            gap: 0.5rem;
            min-height: 100px;
            max-height: 100px;            
	}
`;

export const CampsiteCardLongTextContainer = styled.div`
      grid-column: 2/3;
      grid-row: 1/3;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      @media (max-width: ${props => props.theme.smallBreakPoint}) {
            grid-column: 2/4;
            grid-row: 1/2;
            padding: 5px 0;
            text-align: left;
            
	}
`

export const CampsiteCardLongPriceContainer = styled.div`
      grid-column: 3/4;
      grid-row: 1/3;
      padding: 20px;
`;

export const CampsiteCardLongTitle = styled(SubTitle)`
      font-size: 1.3rem;
      text-align: left;
      @media (max-width: ${props => props.theme.smallBreakPoint}) {
		font-size: 0.9rem;
	}
`

export const CampsiteCardLongSubText = styled(SubTitle)`
      font-size: 1rem;
      font-weight: 400;
      text-align: left;

      @media (max-width: ${props => props.theme.smallBreakPoint}) {
		font-size: 0.8rem;
	}
`

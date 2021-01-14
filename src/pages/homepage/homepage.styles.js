import styled from "styled-components/macro";
import { ContentContainer } from "../../components/misc/containers.styles";

export const HomepageHeadingContainer = styled(ContentContainer)`
      height: 150px;
      justify-content: space-around;
      padding: 20px 0;
      @media (max-width: ${props => props.theme.smallBreakPoint}){
		padding: 20px 25px;
		
	}
`

export const SearchBarContainer = styled.div`
      width: 100%;
	height: 60px;
	margin: 10px 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
      padding: 0 5%;
      background-color: ${props => props.theme.main};
      border-radius: ${props => props.theme.borderRadius};
      box-sizing: border-box;
      box-shadow: ${props => props.theme.boxShadow};
      @media (max-width: ${props => props.theme.smallBreakPoint}){
            flex-direction: column;
            justify-content: space-around;
            height: 100px;
            padding: 10px 0;
      }
`;

export const HomePageCardsGrid = styled.div`
      width: 100%;
      height: auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: 400px; 
      gap: 0.7rem;
      @media (max-width: ${props => props.theme.largeBreakPoint}) {
            grid-template-columns: repeat(2, 1fr);

      }
      @media (max-width: ${props => props.theme.smallBreakPoint}) {
            grid-template-columns: repeat(1, 100%);
            grid-auto-rows: 300px;
      }
`;
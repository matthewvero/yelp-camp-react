import styled from "styled-components/macro";

export const CampsiteImageCarousel = styled.div`
      height: 400px;
      width: 100%;
      min-height: 300px;
      position: relative;
`;

export const CampsitePageGrid = styled.div`
      width: 100%;
      height: 100%;
      margin-top: 10px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto 475px 1fr;
      gap: 1rem;
      @media (max-width: ${props => props.theme.mediumBreakPoint}) { 
            grid-template-columns: 1fr;
            grid-auto-rows: auto;
      }
`
export const CampsitePageInfoGrid = styled.div`
      width: 100%;
      height: 100%;
      padding: 20px 30px;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 40px 25px 2fr 1fr;
      gap: 1rem;
      align-items: center;
`


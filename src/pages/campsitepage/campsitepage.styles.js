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
      grid-template-rows: 1fr 1fr 1fr;
      gap: 1rem;
      @media (max-width: ${props => props.theme.mediumBreakPoint}) { 
            grid-template-columns: 1fr;
            grid-auto-rows: 1fr;
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

export const CampsitePageCommentSection = styled.div`
      height: 250px; 
      width: 90%; 
      background-color: ${props => props.theme.background}; 
      padding: 20px;
      border-radius: 10px;
      display: "flex";
      flex-direction: column;
      align-items: flex-start;
      overflow-y: scroll;
      text-align: left;
`
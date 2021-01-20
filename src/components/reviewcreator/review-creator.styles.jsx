import styled from 'styled-components';

export const ReviewCreatorGrid = styled.div`
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-rows: 1fr 2fr 2fr;
      grid-template-columns: 3fr 3fr auto;
      gap: 1rem;
`;    

export const RatingsGrid = styled.div`
      grid-row: 3/4;
      grid-column: 1/4;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      grid-auto-columns: 1fr;
      grid-auto-rows: 1fr ;
      gap: 10px;
`
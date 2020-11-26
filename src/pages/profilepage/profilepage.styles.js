import styled from "styled-components";
import { ContentContainer } from "../../components/misc/containers.styles";

export const NameBar = styled(ContentContainer)`
      @media (max-width: 700px){
            align-items: flex-end;
            min-height: 100px;
            position: relative;
            padding-right: 20%;
      }
`;
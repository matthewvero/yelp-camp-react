import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const RatingStar = styled(FontAwesomeIcon)`
      color: ${props => {
            if (props.$active) {
                  return 'dodgerblue';
            } 
            else if (props.$previewactive ) {
                  return 'rgb(125,175,255)';
            } else if (props.$highlight){
                  return 'crimson'
            }
            else {
                  return 'white'
            }
      }};
      cursor: pointer;
      filter: drop-shadow(0 0 1px black);
      transition: all 200ms ease;
`
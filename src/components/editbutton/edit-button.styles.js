import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const EditButtonIcon = styled(FontAwesomeIcon)`
  color: ${props => props.$hovering ? props.theme.colorActive : '#666666'};
  cursor: pointer;
  transform: scale(${props => props.$active ? '0.95' : '1'});
`;    
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components/macro';

export const LikeButtonHeart = styled(FontAwesomeIcon)`
	&:before {
		content: " ";
		height: 10px;
		width: 10px;
		background-color: white;
	}
	
	font-size: 2rem;
	transition: all 0.3s;
	filter: drop-shadow(0 0 2px black);
	cursor: pointer;
	color: ${props => {
		if (props.$active && !props.liked) {
			return 'rgb(255, 100, 100)'
		} else if (props.$hovering){
			return 'pink'
		} else if (props.liked) {
			return 'rgb(255, 100, 100)'
		} else {
			return 'white'
		}
	}};
	transform: ${props => {
		if (props.$active ) {
			return 'scale(1.2)'
		} else if (props.hovering){
			return 'scale(1.1)'
		} else {
			return 'scale(1)'
		}
	}};

`;

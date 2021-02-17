import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components/macro";

export const RatingStar = styled(FontAwesomeIcon)`
	color: ${(props) => {
		if (props.$active) {
			return "dodgerblue";
		} else if (props.$previewactive) {
			return "rgb(125,175,255)";
		} else if (props.$highlight) {
			return "crimson";
		} else {
			return "white";
		}
	}};
	cursor: pointer;
	filter: drop-shadow(0 0 1px black);
	transition: all 200ms ease;
	margin: 0;
`;

export const StarContainer = styled.div`
	height: 100%;
	width: 175px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	@media (max-width: ${(props) => props.theme.xSmallBreakPoint}) {
		width: 120px;
	}
`;

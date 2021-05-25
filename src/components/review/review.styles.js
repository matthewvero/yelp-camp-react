import styled from "styled-components/macro";

export const ReviewContainer = styled.div`
	height: ${(props) => {
		if (props.expanded) {
			return "360px";
		} else {
			return "90px";
		}
	}};
	width: 100%;
	display: grid;
	grid-template-columns: 3fr 1fr;
	grid-template-rows: 50px 70px 100px;
	gap: 0.5rem;
	overflow: hidden;
	transition: all 100ms ease-in;
`;

export const RatingSection = styled.div`
	grid-row: 1/3;
	grid-column: 2/3;
	border-left: solid 1px ${(props) => props.theme.main};
	padding-left: 10px;
	overflow: hidden;
	position: relative;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: start;
`;

export const RatingBar = styled.div`
	height: 3px;
	width: 100%;
	background-color: ${(props) => props.theme.main};
	${(props) => !props.percentage && "box-shadow: inset 0 0 2px white"};
	position: absolute;
	right: 0%;
	border-radius: 2px;
`;

export const RatingBarPercentage = styled(RatingBar)`
	transform: scaleX(
		${(props) => (props.percentage ? props.percentage / 100 : 1)}
	);
	transform-origin: left;
	background-color: ${(props) =>
		props.percentage ? "dodgerblue" : props.theme.main};
`;

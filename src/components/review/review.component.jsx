import {
	faChevronDown,
	faChevronUp,
	faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import { HR } from "../misc/containers.styles";
import { SubText, SubTitle, Text } from "../misc/text.styles";
import Rating from "../rating/rating-component";
import { RatingsGrid } from "../reviewcreator/review-creator.styles";
import {
	RatingBar,
	RatingSection,
	ReviewContainer,
	RatingBarPercentage,
} from "./review.styles";
import { useGetUsername } from "../../utils/auth-hooks";
import Button from "../button/button.component";
import { useSelector } from "react-redux";
import { ThemeContext } from "styled-components";

const Review = ({ review, handleEdit }) => {
	const [averageRating, setAverageRating] = useState(0);
	const [expanded, setExpanded] = useState(false);
	const [categories, setCategories] = useState({});
	const user = useSelector((state) => state.authReducer.user);
	const reviewRef = useRef();
	const username = useGetUsername(review.userID);
	const theme = useContext(ThemeContext);
	useEffect(() => {
		const { ratings } = review.data;
		const ratingSum = Object.keys(ratings).reduce(
			(prev, cur) => prev + ratings[cur],
			0
		);
		const numOfCategories = Object.keys(ratings).length;
		setAverageRating(ratingSum / numOfCategories);
		setCategories(Object.keys(ratings));
	}, [review]);

	return (
		<React.Fragment>
			<ReviewContainer expanded={expanded} ref={reviewRef}>
				<div style={{ display: "flex", height: "30px" }}>
					<SubTitle>{review.data.heading}</SubTitle>
				</div>
				<Text
					style={{
						gridColumn: "1/2",
						gridRow: "2/3",
						textOverflow: "ellipsis",
						overflowY: `${
							expanded ? "scroll" : "hidden"
						}`,
						whiteSpace: `${
							expanded ? "normal" : "nowrap"
						}`,
					}}
				>
					{review.data.body}
				</Text>

				<RatingSection>
					<Text style={{ color: "#666666" }}>
						{username}
					</Text>
					<div
						style={{
							width: "100%",
							height: "17px",
							paddingTop: "10px",
							display: "grid",
							gridTemplateColumns: "1fr 1fr 8fr",
							gap: "5px",
						}}
					>
						<FontAwesomeIcon
							icon={faStar}
							style={{
								color: "white",
								marginRight: "5%",
								gridColumn: "1/2",
								filter:
									"drop-shadow(0 0 1px black)",
							}}
						/>
						<SubText
							style={{
								maxHeight: "100%",
								gridColumn: "2/3",
								display: "inline-block",
								verticalAlign: "middle",
							}}
						>
							{averageRating.toFixed(1)}
						</SubText>
						<div
							style={{
								gridColumn: "3/4",
								position: "relative",
								display: "flex",
								alignItems: "center",
							}}
						>
							<RatingBar />
							<RatingBarPercentage
								percentage={averageRating * 20}
							/>
						</div>
					</div>

					<Text
						style={{
							margin: "10px 0",
							userSelect: "none",
							cursor: "pointer",
						}}
						onPointerDown={() =>
							setExpanded((expanded) => !expanded)
						}
					>
						{expanded ? "Less" : "More"}{" "}
						<FontAwesomeIcon
							icon={
								expanded
									? faChevronDown
									: faChevronUp
							}
						/>
					</Text>

					{user.uid === review.userID && expanded && (
						<Button
							style={{
								padding: "2px 5px",
								backgroundColor: theme.color,
							}}
							fn={() => handleEdit(review)}
						>
							Edit
						</Button>
					)}
				</RatingSection>
				<RatingsGrid
					style={{ gridColumn: "1/3", gridRow: "3/4" }}
				>
					{categories.length &&
						categories.map((el, idx) => (
							<Rating
								title={el}
								key={idx}
								display
								displayRating={
									review.data.ratings[el]
								}
							/>
						))}
				</RatingsGrid>
			</ReviewContainer>
			<HR />
		</React.Fragment>
	);
};

export default Review;

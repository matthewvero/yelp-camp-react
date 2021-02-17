import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import { addReview, deleteReview, updateReview } from "../../firebase.utils";
import {
	FormInputText,
	FormInputTextArea,
} from "../inputs/input-text/inputs.styles";
import Rating from "../rating/rating-component";
import { RatingsGrid, ReviewCreatorGrid } from "./review-creator.styles";
import Button from "../button/button.component";

const ReviewCreator = ({ campsiteID, exit, review }) => {
	const themeContext = useContext(ThemeContext);
	const [ratings, setRatings] = useState(review ? review.data.ratings : {});
	const [filled, setFilled] = useState({
		Accuracy: false,
		"Check-in": false,
		Cleanliness: false,
		Communication: false,
		Location: false,
		Value: false,
	});
	const [sendable, setSendable] = useState(false);
	const [allRatingsFilled, setAllRatingsFilled] = useState(false);
	const [body, setBody] = useState(review ? review.data.body : "");
	const [heading, setHeading] = useState(review ? review.data.heading : "");
	const [highlight, setHighlight] = useState(false);
	const [errorBody, setErrorBody] = useState(false);
	const [errorHeading, setErrorHeading] = useState(false);

	const handleSubmit = () => {
		setHighlight(true);
		if (sendable && review) {
			updateReview({ ...review, data: { heading, body, ratings } });
			exit();
		} else if (sendable) {
			addReview(campsiteID, {
				heading,
				body,
				ratings,
			});
			exit();
		}
		if (heading.length < 10) {
			setErrorHeading(true);
		}
		if (body.length < 10) {
			setErrorBody(true);
		}
	};

	const handleDelete = () => {
		const ans = window.confirm(
			"Are you sure you would like to delete this Review? This can not be undone."
		);
		if (ans) {
			deleteReview(review.reviewID);
			exit();
		}
	};

	useEffect(() => {
		// Check all inputs have been filled
		if (allRatingsFilled && body.length > 10 && heading.length > 10) {
			setSendable(true);
		}
	}, [allRatingsFilled, body, heading]);

	useEffect(() => {
		// Check each rating has been filled in
		for (const category in ratings) {
			const isTrue = ratings[category] >= 1;
			setFilled((filled) => ({
				...filled,
				[category]: isTrue,
			}));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ratings]);

	useEffect(() => {
		// check all ratings have been filled
		setAllRatingsFilled(
			Object.keys(filled).every((e) => filled[e] === true)
		);
	}, [filled]);

	// Remove warnings when criteria met.
	useEffect(() => {
		if (errorHeading && heading.length >= 10) {
			setErrorHeading(false);
		}
		if (errorBody && body.length >= 10) {
			setErrorBody(false);
		}
	}, [body, errorBody, errorHeading, heading]);

	return (
		<form style={{ width: "100%", height: "100%" }}>
			<ReviewCreatorGrid>
				<div
					style={{
						gridColumn: "3/4",
						gridRow: "1/2",
						display: "flex",
					}}
				>
					{review && (
						<Button
							style={{
								gridColumn: "3/4",
								gridRow: "1/2",
								padding: "0 5px",
								backgroundColor: "crimson",
								marginRight: "10px",
								height: "40px",
							}}
							fn={handleDelete}
						>
							Delete
						</Button>
					)}
					<div
						style={{
							justifySelf: "end",
							height: "40px",
							width: "40px",
							backgroundColor: `${
								sendable ? "dodgerblue" : "grey"
							}`,
							borderRadius: "10px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							cursor: "pointer",
						}}
						onPointerDown={() => handleSubmit()}
					>
						<FontAwesomeIcon
							icon={faPaperPlane}
							style={{
								color: "white",
								fontSize: "1.5rem",
							}}
						/>
					</div>
				</div>
				<FormInputText
					placeholder="Heading..."
					style={{
						padding: "8px",
						borderRadius: "10px",
						gridColumn: "1/3",
						border: `solid 2px ${
							errorHeading
								? "crimson"
								: themeContext.background
						}`,
					}}
					value={heading}
					onChange={(e) => setHeading(e.target.value)}
				/>
				<FormInputTextArea
					style={{
						padding: "8px",
						borderRadius: "10px",
						gridRow: "2/3",
						gridColumn: "1/4",
						border: `solid 2px ${
							errorHeading
								? "crimson"
								: themeContext.background
						}`,
					}}
					placeholder="Body..."
					value={body}
					onChange={(e) => setBody(e.target.value)}
				/>

				<RatingsGrid>
					<Rating
						title="Cleanliness"
						setStars={setRatings}
						highlight={highlight}
						filledArr={filled}
						ratings={ratings}
					/>
					<Rating
						title="Communication"
						setStars={setRatings}
						highlight={highlight}
						filledArr={filled}
						ratings={ratings}
					/>
					<Rating
						title="Check-in"
						setStars={setRatings}
						highlight={highlight}
						filledArr={filled}
						ratings={ratings}
					/>
					<Rating
						title="Accuracy"
						setStars={setRatings}
						highlight={highlight}
						filledArr={filled}
						ratings={ratings}
					/>
					<Rating
						title="Location"
						setStars={setRatings}
						highlight={highlight}
						filledArr={filled}
						ratings={ratings}
					/>
					<Rating
						title="Value"
						setStars={setRatings}
						filledArr={filled}
						highlight={highlight}
						ratings={ratings}
					/>
				</RatingsGrid>
			</ReviewCreatorGrid>
		</form>
	);
};

export default ReviewCreator;

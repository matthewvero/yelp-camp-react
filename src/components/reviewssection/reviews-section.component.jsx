import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { ContentContainer } from "../misc/containers.styles";
import { SubTitle, Text } from "../misc/text.styles";
import Review from "../review/review.component";
import { CommunityContentSection } from "../../components/misc/containers.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
	ReviewSectionGrid,
	ReviewsSectionSlide,
} from "./reviews-section.styles";
import ReviewCreator from "../reviewcreator/review-creator.component";
import { useReviewListener } from "../../utils/campsite-hooks";
import { useSelector } from "react-redux";

const ReviewsSection = ({ campsiteID }) => {
	const [editable, setEditable] = useState(false);
	const [creating, setCreating] = useState(false);
	const [review, setReview] = useState();
	const creatorRef = useRef(null);
	const reviewsRef = useRef(null);
	const reviews = useReviewListener(campsiteID);
	const userProfile = useSelector((state) => state.authReducer.userProfile);
	const handleEdit = (review) => {
		setReview(review);
		setCreating(true);
	};

	useEffect(() => {
		userProfile.hasOwnProperty("uid")
			? setEditable(true)
			: setEditable(false);
	}, [userProfile]);

	useEffect(() => {
		if (creating === false) {
			setReview();
		}
	}, [creating]);

	return (
		<ContentContainer style={{ padding: "10px" }}>
			<ReviewSectionGrid>
				<div
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						boxSizing: "border-box",
						gridRow: "1/2",
					}}
				>
					<SubTitle>Reviews</SubTitle>
					{editable && (
						<div
							style={{
								height: "40px",
								width: "40px",
								backgroundColor: `${
									creating
										? "crimson"
										: "dodgerblue"
								}`,
								borderRadius: "10px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								cursor: "pointer",
							}}
							onPointerDown={() =>
								setCreating(
									(creating) => !creating
								)
							}
						>
							<FontAwesomeIcon
								icon={
									creating ? faTimes : faPen
								}
								style={{
									color: "white",
									fontSize: "1.5rem",
								}}
							/>
						</div>
					)}
				</div>

				<CommunityContentSection
					style={{
						height: "100%",
						position: "relative",
						gridRow: "2/3",
					}}
				>
					<CSSTransition
						in={!creating}
						classNames="reviewSection"
						timeout={200}
						unmountOnExit
						nodeRef={reviewsRef}
					>
						<ReviewsSectionSlide ref={reviewsRef}>
							{reviews && reviews.length ? (
								reviews.map((el, idx) => (
									<Review
										review={el}
										key={idx}
										handleEdit={
											handleEdit
										}
									/>
								))
							) : (
								<Text
									style={{
										textAlign: "center",
									}}
								>
									No Reviews Yet...
								</Text>
							)}
						</ReviewsSectionSlide>
					</CSSTransition>
					<CSSTransition
						in={creating}
						classNames="reviewSection"
						timeout={200}
						unmountOnExit
						nodeRef={creatorRef}
					>
						<ReviewsSectionSlide ref={creatorRef}>
							<ReviewCreator
								campsiteID={campsiteID}
								review={review}
								exit={() => setCreating(false)}
							/>
						</ReviewsSectionSlide>
					</CSSTransition>
				</CommunityContentSection>
			</ReviewSectionGrid>
		</ContentContainer>
	);
};

export default ReviewsSection;

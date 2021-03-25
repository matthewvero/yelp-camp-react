import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useRef } from "react";
import { ThemeContext } from "styled-components";
import {
	CampsiteCardContainer,
	CampsiteCardImageContainer,
	CardContentContainer,
} from "./campsite-card.styles";
import Image from "../image/image.component";
import { SubTitle, Text } from "../misc/text.styles";
import { useSelector } from "react-redux";
import {
	useLikeListener,
	useRatingCalculator,
} from "../../utils/campsite-hooks";
import { withRouter } from "react-router";
import LikeButton from "../likebutton/like-button.component";
import { useImageResize } from "../../utils/ui-hooks";

const CampsiteCard = ({ campsite, history }) => {
	const themeContext = useContext(ThemeContext);
	const user = useSelector((state) => state.authReducer.user);
	const { averageRating } = useRatingCalculator(campsite.uid);
	const { likedBy } = useLikeListener(campsite);
	const imageRef = useRef();
	const images = useImageResize(campsite.images, imageRef);

	const handleClick = (e) => {
		history.push(`/campsite/${campsite.uid}`);
	};

	return (
		<CampsiteCardContainer onClick={(e) => handleClick(e)}>
			<CampsiteCardImageContainer ref={imageRef}>
				<Image
					image={images && images[0]}
					style={{ height: "260px" }}
				/>
			</CampsiteCardImageContainer>

			<LikeButton
				style={{
					zIndex: "3",
					position: "absolute",
					top: "10px",
					right: "40px",
				}}
				user={user}
				campsite={campsite}
			/>
			<Text
				style={{
					zIndex: "3",
					position: "absolute",
					top: "15px",
					right: "20px",
					fontWeight: "600",
					color: "white",
					filter: "drop-shadow(0 0 2px black)",
				}}
			>
				{likedBy.length}
			</Text>
			<CardContentContainer>
				<span
					style={{
						color: themeContext.color,
						fontSize: "1.3rem",
					}}
				>
					<FontAwesomeIcon
						icon={faStar}
						style={{ marginRight: "10px" }}
					/>
					<span
						style={{
							color: themeContext.textAlt,
							fontWeight: "600",
						}}
					>
						{averageRating.toFixed(1)}
					</span>
				</span>

				<SubTitle
					style={{
						margin: "0",
						color: themeContext.textAlt,
					}}
				>
					{campsite.title}
				</SubTitle>

				<Text
					style={{
						margin: "0",
						color: themeContext.textAlt,
					}}
				>
					{campsite.description}
				</Text>
			</CardContentContainer>
		</CampsiteCardContainer>
	);
};

export default withRouter(CampsiteCard);

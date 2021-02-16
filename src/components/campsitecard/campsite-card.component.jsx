import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import {
	CampsiteCardContainer,
	CampsiteCardImageContainer,
	CardContentContainer,
} from "./campsite-card.styles";
import Image from "../image/image.component";
import { SubTitle, Text } from "../misc/text.styles";
import { useSelector } from "react-redux";
import { useCampsiteImageURLS, useLikeListener, useRatingCalculator } from "../../utils/campsite-hooks";
import { withRouter } from "react-router";
import LikeButton from "../likebutton/like-button.component";

const CampsiteCard = ({ campsite, history }) => {
	const themeContext = useContext(ThemeContext);
	const user = useSelector(state => state.authReducer.user);
	const {averageRating} = useRatingCalculator(campsite.id)
	const {likedBy} = useLikeListener(campsite)

	const images = useCampsiteImageURLS(campsite.id);

	const handleClick = (e) => {
		history.push(`/campsite/${campsite.id}`)
	}

	

	return (
		<CampsiteCardContainer
			onClick={e => handleClick(e)}
		> 
			<CampsiteCardImageContainer>
				<Image image={images && images[0]} style={{height: '260px'}}/>
			</CampsiteCardImageContainer>

			<LikeButton style={{
				zIndex: '3',
				position: 'absolute',
				top: '10px',
				right: '40px'
			}} user={user} campsite={campsite} />
			<Text style={{
				zIndex: '3',
				position: 'absolute',
				top: '15px',
				right: '20px',
				fontWeight: '600',
				color: 'white',
				filter: 'drop-shadow(0 0 2px black)'
			}}>
				{likedBy.length}
			</Text>
			<CardContentContainer>
				<span style={{ color: themeContext.color }}>
					<FontAwesomeIcon icon={faStar} style={{marginRight: '10px'}}/>

					{averageRating.toFixed(1)}
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

import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import {
	CampsiteCardContainer,
	CampsiteCardHeart,
	CampsiteCardImageContainer,
	CampsiteCardThing,
	CardContentContainer,
} from "./campsite-card.styles";
import Image from "../image/image.component";
import { storage } from "../../firebase";
import { SubTitle, Text } from "../misc/text.styles";
import { likeCampsite } from "../../firebase.utils";
import { useSelector } from "react-redux";
import { useCampsiteImageURLS, useLikeListener } from "../../utils/campsite-hooks";
import withTouchAnimator from "../touch-hoc/touch-hoc.component";
import { withRouter } from "react-router";

const CampsiteCard = ({ campsite, history }) => {
	const themeContext = useContext(ThemeContext);
	const user = useSelector(state => state.authReducer.user);
	const liked = useLikeListener(campsite, user);
	const CampsiteHeartTouch = withTouchAnimator(CampsiteCardHeart);
	const images = useCampsiteImageURLS(campsite.id);

	const handleClick = (e) => {
		history.push(`/campsite/${campsite.id}`)
	}

	const handleLike = () => {
		likeCampsite(campsite.id, user.uid, liked);
	}

	return (
		<CampsiteCardContainer
			onClick={e => handleClick(e)}
		> 
			<CampsiteCardThing/>
			<CampsiteCardImageContainer>
				<Image image={images && images[0]} styles={{height: '260px'}}/>
			</CampsiteCardImageContainer>

			<CampsiteHeartTouch icon={faHeart} liked={liked ? 1 : 0}  fn={handleLike} onClick={e => e.stopPropagation()}/>

			<CardContentContainer>
				<span style={{ color: themeContext.color }}>
					<FontAwesomeIcon icon={faStar} />

					{campsite.rating}
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

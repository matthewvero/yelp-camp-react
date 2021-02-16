import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { withRouter } from "react-router";
import { ThemeContext } from "styled-components";
import { useCampsiteImageURLS, useRatingCalculator } from "../../utils/campsite-hooks";
import Image from "../image/image.component";
import { CampsiteCardLongContainer, CampsiteCardLongTextContainer, CampsiteCardLongPriceContainer, CampsiteCardLongTitle, CampsiteCardLongSubText } from "./campsite-card-long.styles";

const CampsiteCardLong = ({ campsite, history }) => {
	const themeContext = useContext(ThemeContext);
	const {averageRating} = useRatingCalculator(campsite.id)
	const images = useCampsiteImageURLS(campsite.id)

	return (
			<CampsiteCardLongContainer onClick={() => history.push(`/campsite/${campsite.id}`)}>
				<div
					style={{
						gridRow: "1 / 3",
						borderRadius: "10px",
						overflow: "hidden",
						
					}}
				>
					<Image image={images && images[0]} />
				</div>

				<CampsiteCardLongTextContainer>
				<CampsiteCardLongTitle>
					{campsite.title}
				</CampsiteCardLongTitle>
				
				
				<CampsiteCardLongSubText>
					{campsite.description}
				</CampsiteCardLongSubText>
				</CampsiteCardLongTextContainer>
				

				<CampsiteCardLongPriceContainer>
					<CampsiteCardLongSubText
						style={{
							color: themeContext.color,
							alignSelf: "start",
							marginBottom: '10px'
						}}
						>
						£{campsite.price} /Night
					</CampsiteCardLongSubText>
					<CampsiteCardLongSubText
						style={{
							color: themeContext.color,
							alignSelf: "start",
							
						}}
						>
						<FontAwesomeIcon icon={faStar} style={{marginRight: '10px'}}/>
						<span>{averageRating.toFixed(1)}</span>
					</CampsiteCardLongSubText>
				</CampsiteCardLongPriceContainer>
			</CampsiteCardLongContainer>
	);
};

export default withRouter(CampsiteCardLong);

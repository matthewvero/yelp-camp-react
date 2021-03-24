import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useRef } from "react";
import { withRouter } from "react-router";
import { ThemeContext } from "styled-components";
import {
	useCampsiteImageURLS,
	useRatingCalculator,
} from "../../utils/campsite-hooks";
import { useImageResize } from "../../utils/ui-hooks";
import Image from "../image/image.component";
import {
	CampsiteCardLongContainer,
	CampsiteCardLongTextContainer,
	CampsiteCardLongPriceContainer,
	CampsiteCardLongTitle,
	CampsiteCardLongSubText,
} from "./campsite-card-long.styles";

const CampsiteCardLong = ({ campsite, history }) => {
	const themeContext = useContext(ThemeContext);
	const { averageRating } = useRatingCalculator(campsite.uid);
	const imageContainerRef = useRef();

	const images = useImageResize(campsite.images, imageContainerRef);

	return (
		<CampsiteCardLongContainer
			onClick={() => history.push(`/campsite/${campsite.uid}`)}
		>
			<div
				style={{
					gridRow: "1 / 3",
					borderRadius: "10px",
					overflow: "hidden",
				}}
				ref={imageContainerRef}
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
						marginBottom: "10px",
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
					<FontAwesomeIcon
						icon={faStar}
						style={{ marginRight: "10px" }}
					/>
					<span>{averageRating.toFixed(1)}</span>
				</CampsiteCardLongSubText>
			</CampsiteCardLongPriceContainer>
		</CampsiteCardLongContainer>
	);
};

export default withRouter(CampsiteCardLong);

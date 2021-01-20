import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { useCampsiteImageURLS } from "../../utils/campsite-hooks";
import Image from "../image/image.component";
import { CampsiteCardLongContainer, CampsiteCardLongTextContainer, CampsiteCardLongPriceContainer, CampsiteCardLongTitle, CampsiteCardLongSubText } from "./campsite-card-long.styles";

const CampsiteCardLong = ({ campsite }) => {
	const themeContext = useContext(ThemeContext);

	const images = useCampsiteImageURLS(campsite.id)

	return (
			<CampsiteCardLongContainer>
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
						}}
						>
						£{campsite.price} /Night
					</CampsiteCardLongSubText>
				</CampsiteCardLongPriceContainer>
			</CampsiteCardLongContainer>
	);
};

export default CampsiteCardLong;

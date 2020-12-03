import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import {
	CampsiteCardContainer,
	CampsiteCardHeart,
	CampsiteCardImageContainer,
} from "./campsite-card.styles";
import Image from "../image/image.component";
import { storage } from "../../firebase";
import { SubTitle, Text } from "../misc/text.styles";

const CampsiteCard = ({ campsite }) => {
	const [image, setImage] = useState();
	const themeContext = useContext(ThemeContext);
	const cardContentContainer = {
		width: "100%",
		height: "140px",
		padding: "10px 20px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "start",
		boxSizing: 'border-box',
	};

	useEffect(() => {
		const getImage = async () => {
			const storageRef = storage.ref();
			const listRef = await storageRef
				.child(`/images/${campsite.id}`)
				.listAll();
			setImage(await listRef.items[0].getDownloadURL());
		};
		getImage();
	}, [campsite.id]);

	return (
		<CampsiteCardContainer>
			<CampsiteCardImageContainer>
				<Image image={image} styles={{height: '260px'}}/>
			</CampsiteCardImageContainer>

			<CampsiteCardHeart icon={faHeart} />

			<div style={cardContentContainer}>
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
			</div>
		</CampsiteCardContainer>
	);
};

export default CampsiteCard;

import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import {
	CampsiteCardContainer,
	CampsiteCardHeart,
} from "./campsite-card.styles";
import Image from "../image/image.component";
import { storage } from "../../firebase";
import { SubTitle, Text } from "../misc/text.styles";

const CampsiteCard = ({ campsite }) => {
	const [image, setImage] = useState();
	const themeContext = useContext(ThemeContext);
	const cardContentContainer = {
		width: "100%",
		height: "100%",
		padding: "10px 20px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "start",
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
			<div
				style={{
					maxHeight: "65%",
					minHeight: "65%",
					width: "100%",
				}}
			>
				<Image image={image} />
			</div>

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

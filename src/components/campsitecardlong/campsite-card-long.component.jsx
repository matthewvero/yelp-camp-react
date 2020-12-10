import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import { storage } from "../../firebase";
import Image from "../image/image.component";
import { SubTitle, Text } from "../misc/text.styles";
import { CampsiteCardLongContainer, CampsiteCardLongTextContainer, CampsiteCardLongPriceContainer } from "./campsite-card-long.styles";

const CampsiteCardLong = ({ campsite }) => {
	const themeContext = useContext(ThemeContext);
	const [image, setImage] = useState();

	useEffect(() => {
		const getImage = async () => {
			const storageRef = storage.ref();
			const listRef = await storageRef
				.child(`/images/${campsite.id}`)
				.listAll();
			listRef.items.length &&
			setImage(await listRef.items[0].getDownloadURL());
		};
		getImage();
	}, [campsite.id]);

	return (
			<CampsiteCardLongContainer>
				<div
					style={{
						gridRow: "1 / 3",
						borderRadius: "10px",
						overflow: "hidden",
						
					}}
				>
					<Image image={image} />
				</div>

				<CampsiteCardLongTextContainer>
				<SubTitle style={{textAlign: 'left'}}>
					{campsite.title}
				</SubTitle>
				
				
				<Text
					style={{
						textAlign: "left",
					}}
					>
					{campsite.description}
				</Text>
				</CampsiteCardLongTextContainer>
				

				<CampsiteCardLongPriceContainer>
					<SubTitle
						style={{
							color: themeContext.color,
							alignSelf: "start",
						}}
						>
						£{campsite.price} /Night
					</SubTitle>
				</CampsiteCardLongPriceContainer>
			</CampsiteCardLongContainer>
	);
};

export default CampsiteCardLong;

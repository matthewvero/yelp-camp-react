import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import { storage } from "../../firebase";
import Image from "../image/image.component";
import { ContentContainer } from "../misc/containers.styles";
import { SubTitle, Text } from "../misc/text.styles";

const CampsiteCardLong = ({ campsite }) => {
	const themeContext = useContext(ThemeContext);
	const [image, setImage] = useState();

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
		<ContentContainer
			style={{ width: "100%", height: "200px", margin: "5px" }}
		>
			<div
				style={{
					height: "100%",
					width: "100%",
					padding: "10px",
					boxSizing: "border-box",
					display: "grid",
					gridTemplateColumns: "minmax(213px, 25%) auto minmax(120px, 20%)",
					gridTemplateRows: "30% auto",
					gap: "1rem",
				}}
			>
				<div
					style={{
						gridRow: "1 / 3",
						borderRadius: "10px",
						overflow: "hidden",
						
					}}
				>
					<Image image={image} />
				</div>

				<SubTitle
					style={{
						gridColumn: "2/3",
						textAlign: "left",
						margin: 'auto 0'
					}}
				>
					{campsite.title}
				</SubTitle>

				<div
					style={{
						gridColumn: "2/3",
						gridRow: "2/3",
						overflow: "scroll",
					}}
				>
					<Text
						style={{
							textAlign: "left",
						}}
					>
						{campsite.description}
					</Text>
				</div>

				<SubTitle
					style={{
						color: themeContext.color,
						alignSelf: "start",
						margin: 'auto 0'
					}}
				>
					£{campsite.price} /Night
				</SubTitle>
			</div>
		</ContentContainer>
	);
};

export default CampsiteCardLong;

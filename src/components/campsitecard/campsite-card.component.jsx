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
import { db, storage } from "../../firebase";
import { SubTitle, Text } from "../misc/text.styles";
import { likeCampsite } from "../../firebase.utils";
import { useSelector } from "react-redux";

const CampsiteCard = ({ campsite }) => {
	const [image, setImage] = useState();
	const themeContext = useContext(ThemeContext);
	const user = useSelector(state => state.authReducer.user);
	const [liked, setLiked] = useState(false);
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

	const handleLike = () => {
		likeCampsite(campsite.id, user.uid, liked);
	}

	useEffect(() => {
		setLiked(campsite.likedBy.includes(user.uid))
	}, [campsite.likedBy, user.uid])

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

	// Listen for updates in the likes
	useEffect(() => {
		const unsub = db.collection('campsites')
		.doc(campsite.id)
		.onSnapshot(snapshot => {
			const data = snapshot.data();
			setLiked(data.likedBy.includes(user.uid))
		})
		return () => unsub();
	}, [campsite.id, user.uid])

	return (
		<CampsiteCardContainer>
			<CampsiteCardImageContainer>
				<Image image={image} styles={{height: '260px'}}/>
			</CampsiteCardImageContainer>

			<CampsiteCardHeart icon={faHeart} liked={liked ? 1 : 0}  onMouseUp={() => handleLike()}/>

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

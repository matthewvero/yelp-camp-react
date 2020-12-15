import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
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

	const ref = useRef()
      const [Xtilt, setXTilt] = useState();
	const [Ytilt, setYTilt] = useState();
	const [YShadow, setYShadow] = useState();
	const [XShadow, setXShadow] = useState();
      const handleHover = (e) => {
		// adds perspective effect
            const x = e.pageX - ref.current.offsetLeft;
            const y = e.pageY - ref.current.offsetTop;
            const width = ref.current.offsetWidth;
            const height = ref.current.offsetHeight
            const tiltPercentageY = Math.ceil(y / height * 20);
		const tiltPercentageX = Math.ceil(x / width * 20);
		const ShadowPercentageY = Math.ceil(y / height * 10);
		const ShadowPercentageX = Math.ceil(x / width * 10);
            setYTilt(tiltPercentageY);
		setXTilt(tiltPercentageX);
		setYShadow(ShadowPercentageY - 5);
		setXShadow(ShadowPercentageX - 5);
      }

      const handleMouseOut = () => {
            setXTilt(10)
		setYTilt(10)
		setXShadow(0)
		setYShadow(-1)
      }

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
		<CampsiteCardContainer 
			tiltX={Xtilt - 10}
			tiltY={-Ytilt + 10}
			shadowX={XShadow * -1}
			shadowY={YShadow * -1}
			onMouseMove={e => handleHover(e)}
			ref={ref}
			onMouseOut={() => handleMouseOut()}
			> 
			
			<CampsiteCardImageContainer>
				<Image image={image} styles={{height: '260px'}}/>
			</CampsiteCardImageContainer>

			<CampsiteCardHeart icon={faHeart} liked={liked ? 1 : 0}  onPointerUp={() => handleLike()}/>

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

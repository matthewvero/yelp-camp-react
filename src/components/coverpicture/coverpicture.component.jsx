import {
	faCamera,
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import { addProfileImage, getUserImages } from "../../firebase.utils.js";
import Image from "../image/image.component.jsx";
import InputImage from "../inputs/input-image/input-image.component";
import { UpdateImageButtonContainer } from "../inputs/input-text/inputs.styles";
import {
	CoverPictureContainer,

	NoCoverPicture,

} from "./coverpicture.styles";

const CoverPicture = ({userID, editable}) => {
	const themeContext = useContext(ThemeContext);
	const [images, setImages] = useState([]);
	const [currentImage, setCurrentImage] = useState(0);

	const updateCoverImage = async (image) => {
		const uploadTask = addProfileImage(image, "coverImages");
		uploadTask.then(async () => {
			const URLs = await getUserImages("coverImages", userID);
			setImages(URLs);
			setCurrentImage(0);
		});
	};

	const handleClick = (direction) => {
		// Cycle through available images
		if (direction === "next") {
			setCurrentImage((currentImage) => {
				let num;
				currentImage + 1 < images.length
					? (num = currentImage + 1)
					: (num = 0);
				return num;
			});
		} else {
			setCurrentImage((currentImage) => {
				let num;
				currentImage - 1 < 0
					? (num = images.length - 1)
					: (num = currentImage - 1);
				return num;
			});
		}
	};

	useEffect(() => {
		const getImages = async () => {
			const URLs = await getUserImages("coverImages", userID);
			setImages(URLs);
		};
		getImages();
	}, [userID]);

	return (
		<CoverPictureContainer>
			{editable &&
				<UpdateImageButtonContainer htmlFor="coverImage">
					<FontAwesomeIcon icon={faCamera} />
				</UpdateImageButtonContainer>
			}

			<InputImage setImageFn={updateCoverImage} id="coverImage" />

			{images.length ? (

				<Image image={images[0]} />

			) : (
				<NoCoverPicture>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						style={{
							position: "absolute",
							bottom: "0px",
							left: "0px",
						}}
						viewBox="0 0 1300 300"
					>
						<path
							d="m 0 150 h 250 l 100 -50 l 100 50 l 50 -25 l 50 25 l 125 -50 l 125 50 l 125 -75 l 125 75 h 250 v 200 h -1300 v -200"
							fill={themeContext.main}
						/>
					</svg>
				</NoCoverPicture>
			)}
		
		</CoverPictureContainer>
	);
};

export default CoverPicture;

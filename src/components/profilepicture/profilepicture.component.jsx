import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { addImage, getUserProfile } from "../../firebase.utils";
import Image from "../image/image.component";
import InputImage from "../inputs/input-image/input-image.component";
import { UpdateImageButtonContainer } from "../inputs/input-text/inputs.styles";
import {
	NoProfileImage,
	NoProfileImageIcon,
	ProfilePictureContainer,
	Switcher,
} from "./profilepicture.styles";
import { faCamera, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { LoadingWaves, Wave } from "../misc/loadinganimations.styles";
import { setImageViewerArr } from "../../redux/ui-redux/ui.actions";

const ProfilePicture = ({ userID, editable, images }) => {
	const [loading, setLoading] = useState(false);
	const [selectedFile, setSelectedFile] = useState();
	const imageRef = useRef();
	const noImageRef = useRef();
	const containerRef = useRef();
	const dispatch = useDispatch();
	const [resizedImageLinks, setResizedImageLinks] = useState([]);

	const getImages = async () => {
		const height = containerRef.current.offsetHeight;
		const width = containerRef.current.offsetWidth;
		let imageLinks = [];

		if (images) {
			imageLinks = images.map(
				(image) =>
					`${image.link}?ch=${height + 100}&w=${
						width + 100
					}`
			);
		}
		setResizedImageLinks(imageLinks);
	};

	const getImagesMemo = useCallback(getImages, [images]);

	useEffect(() => {
		// check images have not already been retrieved
		images && getImagesMemo();
	}, [getImagesMemo, images]);

	useEffect(() => {
		const url = `userprofiles/${userID}/profileimages`;
		const uploadImage = async () => {
			setLoading(true);
			await addImage(selectedFile, url);
			setLoading(false);
			setSelectedFile("");
			getImagesMemo(); // Request new image resized
		};
		if (selectedFile) {
			uploadImage();
		}
	}, [getImagesMemo, selectedFile, userID]);

	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				position: "relative",
			}}
		>
			{editable && (
				<UpdateImageButtonContainer htmlFor="profileImage">
					<FontAwesomeIcon icon={faCamera} />
				</UpdateImageButtonContainer>
			)}
			{loading && (
				<LoadingWaves>
					<Wave />
					<Wave delay="500" />
				</LoadingWaves>
			)}
			<ProfilePictureContainer ref={containerRef}>
				<InputImage
					setImageFn={(file) => setSelectedFile(file)}
					id="profileImage"
				/>

				<CSSTransition
					in={images && images.length ? true : false}
					classNames="switcher"
					timeout={100}
					unmountOnExit
					nodeRef={imageRef}
				>
					<Switcher
						ref={imageRef}
						onPointerDown={() =>
							dispatch(setImageViewerArr(images))
						}
					>
						<Image
							image={
								resizedImageLinks[
									resizedImageLinks.length -
										1
								]
							}
						/>
					</Switcher>
				</CSSTransition>

				<CSSTransition
					in={resizedImageLinks.length ? false : true}
					classNames="switcher"
					timeout={100}
					unmountOnExit
					nodeRef={noImageRef}
				>
					<Switcher ref={noImageRef}>
						<NoProfileImage>
							<NoProfileImageIcon icon={faUser} />
						</NoProfileImage>
					</Switcher>
				</CSSTransition>
			</ProfilePictureContainer>
		</div>
	);
};

export default ProfilePicture;

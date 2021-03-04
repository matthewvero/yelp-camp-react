import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import {
	addProfileImage,
	getUserImages,
	getUserProfile,
} from "../../firebase.utils";
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
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

const ProfilePicture = ({ userID, editable }) => {
	const [images, setImages] = useState([]);
	const user = useSelector((state) => state.authReducer.user);
	const userProfile = useSelector((state) => state.authReducer.userProfile);
	const [selectedFile, setSelectedFile] = useState();
	const imageRef = useRef();
	const noImageRef = useRef();
	const containerRef = useRef();

	const getImages = async () => {
		const height = containerRef.current.offsetHeight;
		const width = containerRef.current.offsetWidth;
		const userProfile = await getUserProfile(userID);
		const resizedImageLinks = userProfile.profileimages.map(
			(el) => `${el}?ch=${height}&w=${width}`
		);
		setImages(resizedImageLinks);
	};

	const getImagesMemo = useCallback(getImages, [userID]);

	useEffect(() => {
		getImagesMemo();
	}, [getImagesMemo, user.uid, userID, userProfile.profilePicture]);

	const encodeImage = async (image) => {
		//read data from the blob objects(file)
		let reader = new FileReader();
		//reads the binary data and encodes it as base64 data url
		reader.readAsDataURL(image);
		//reads it finish with either success or failure
		reader.onloadend = () => {
			//reader.result is the result of the reading in base64 string
			setSelectedFile(reader.result);
		};
	};

	useEffect(() => {
		if (selectedFile) {
			uploadImage();
		}
	}, [selectedFile]);

	const uploadImage = () => {
		fetch(
			"http://localhost:5001/yelpcamp-d57d1/us-central1/widgets/newprofileimage",
			{
				// Your POST endpoint
				method: "POST",
				body: JSON.stringify({
					base64ImageString: selectedFile,
					userID: userID,
					imagetype: "profileimages",
				}),
			}
		)
			.then(
				(response) => response.text() // if the response is a JSON object
			)
			.then(
				(success) => getImagesMemo() // Handle the success response object
			)
			.catch(
				(error) => console.log(error) // Handle the error response object
			);
	};

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

			<ProfilePictureContainer ref={containerRef}>
				<InputImage
					setImageFn={encodeImage}
					id="profileImage"
				/>

				<CSSTransition
					in={images && images.length ? true : false}
					classNames="switcher"
					timeout={100}
					unmountOnExit
					nodeRef={imageRef}
				>
					<Switcher ref={imageRef}>
						<Image image={images[images.length - 1]} />
					</Switcher>
				</CSSTransition>

				<CSSTransition
					in={images.length ? false : true}
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

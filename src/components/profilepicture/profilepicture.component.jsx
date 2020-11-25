import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "styled-components";
import { addProfileImage, getUserImages } from "../../firebase.utils";
import Image from "../image/image.component";
import InputImage from "../inputs/input-image/input-image.component";
import { UpdateImageButtonContainer } from "../inputs/input-text/inputs.styles";
import {
	NoProfileImage,
	ProfilePictureContainer,
} from "./profilepicture.styles";
import { faCamera, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfilePicture = () => {
	const themeContext = useContext(ThemeContext);
	const user = useSelector((state) => state.authReducer.user);
	const [image, setImage] = useState([]);

	useEffect(() => {
		const getImages = async () => {
			const URLs = await getUserImages("profileImages", user.uid);
			setImage(URLs);
		};
		getImages();
	}, [user]);

	const updateProfileImage = async (image) => {
		const uploadTask = addProfileImage(image, "profileImages");
		uploadTask.then(async () => {
			const URLs = await getUserImages("profileImages", user.uid);
			setImage(URLs[0]);
		});
	};

	return (
		<ProfilePictureContainer>
			<UpdateImageButtonContainer htmlFor="profileImage">
				<FontAwesomeIcon icon={faCamera} />
			</UpdateImageButtonContainer>

			<InputImage
				setImageFn={updateProfileImage}
				id="profileImage"
			/>

			{image && image.length ? (
				<Image image={image} />
			) : (
				<NoProfileImage>
					<FontAwesomeIcon
						style={{
							position: "absolute",
							fontSize: "7rem",
							color: themeContext.main,
						}}
						icon={faUser}
					/>
				</NoProfileImage>
			)}
		</ProfilePictureContainer>
	);
};

export default ProfilePicture;

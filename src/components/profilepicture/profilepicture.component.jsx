import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { ThemeContext } from "styled-components";
import { addProfileImage, getUserImages } from "../../firebase.utils";
import Image from "../image/image.component";
import InputImage from "../inputs/input-image/input-image.component";
import { UpdateImageButtonContainer } from "../inputs/input-text/inputs.styles";
import {
	NoProfileImage,
	NoProfileImageIcon,
	ProfilePictureContainer,
} from "./profilepicture.styles";
import { faCamera, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const ProfilePicture = ({userID, editable}) => {
	const themeContext = useContext(ThemeContext);
	const [image, setImage] = useState([]);
	const user = useSelector(state => state.authReducer.user);
	const userProfile = useSelector(state => state.authReducer.userProfile)
	useEffect(() => {
		if(userID === user.uid){
			setImage(userProfile.profilePicture)
		} else {
			const getImages = async () => {
				const URLs = await getUserImages("profileImages", userID);
				setImage(URLs[0]);
			};
			getImages();
		}
	}, [user.uid, userID, userProfile.profilePicture]);

	const updateProfileImage = async (image) => {
		const uploadTask = addProfileImage(image, "profileImages");
		uploadTask.then(async () => {
			const URLs = await getUserImages("profileImages", userID);
			setImage(URLs[0]);
		});
	};

	return (
		<ProfilePictureContainer>
			{editable &&
				<UpdateImageButtonContainer htmlFor="profileImage">
					<FontAwesomeIcon icon={faCamera} />
				</UpdateImageButtonContainer>
			}

			<InputImage
				setImageFn={updateProfileImage}
				id="profileImage"
			/>

			{image && image.length ? (
				<Image image={image} />
			) : (
				<NoProfileImage>
					<NoProfileImageIcon
						icon={faUser}
					/>
				</NoProfileImage>
			)}
		</ProfilePictureContainer>
	);
};

export default ProfilePicture;

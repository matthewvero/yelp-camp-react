import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { addProfileImage, getUserImages } from "../../firebase.utils";
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

const ProfilePicture = ({userID, editable}) => {
	const [image, setImage] = useState([]);
	const user = useSelector(state => state.authReducer.user);
	const userProfile = useSelector(state => state.authReducer.userProfile)
	const imageRef = useRef()
	const noImageRef = useRef()
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

	useEffect(() => {
		console.log(image)
	}, [image])

	return (
		<div style={{height: '100%', width: '100%', position: 'relative'}}>
		
		{editable &&
			<UpdateImageButtonContainer htmlFor="profileImage">
			<FontAwesomeIcon icon={faCamera} />
			</UpdateImageButtonContainer>
		}
		
		<ProfilePictureContainer>
			<InputImage
				setImageFn={updateProfileImage}
				id="profileImage"
			/>

			<CSSTransition
				in={image && image.length ? true : false}
				classNames='switcher'
				timeout={100}
				unmountOnExit
				nodeRef={imageRef}
			>
				<Switcher ref={imageRef}>
					<Image image={image} />
				</Switcher>
			</CSSTransition>
			
			<CSSTransition
				in={image && image.length ? false : true}
				classNames='switcher'
				timeout={100}
				unmountOnExit
				nodeRef={noImageRef}
			>
				<Switcher ref={noImageRef}>
					<NoProfileImage>
						<NoProfileImageIcon
							icon={faUser}
						/>
					</NoProfileImage>
				</Switcher>
			</CSSTransition>
			
		</ProfilePictureContainer>
		</div>
	);
};

export default ProfilePicture;

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
import { setImageViewerArr } from "../../redux/ui-redux/ui.actions";
import withLoader from "../loaderHOC.component";
import { useImageResize } from "../../utils/ui-hooks";
import { useImageUploader } from "../../utils/misc-hooks";

const ProfilePicture = ({
	userID,
	editable,
	images,
	setLoading,
	setTransparency,
}) => {
	const [selectedFile, setSelectedFile] = useState();
	const imageRef = useRef();
	const noImageRef = useRef();
	const containerRef = useRef();
	const dispatch = useDispatch();

	const url = `userprofiles/${userID}/profileimages`;

	useImageUploader(selectedFile, setSelectedFile, setLoading, url);

	const resizedImageLinks = useImageResize(images, containerRef);

	useEffect(() => {
		setLoading(false);
		setTransparency(true);
	}, [setLoading, setTransparency]);

	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				position: "relative",
			}}
		>
			{editable && (
				<React.Fragment>
					<UpdateImageButtonContainer htmlFor="profileImage">
						<FontAwesomeIcon icon={faCamera} />
					</UpdateImageButtonContainer>
					<InputImage
						setImageFn={(file) => setSelectedFile(file)}
						id="profileImage"
					/>
				</React.Fragment>
			)}

			<ProfilePictureContainer ref={containerRef}>
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

export default withLoader(ProfilePicture);

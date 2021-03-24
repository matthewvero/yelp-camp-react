// import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { useDispatch } from "react-redux";
import { ThemeContext } from "styled-components";
import { addImage } from "../../firebase.utils.js";
import { setImageViewerArr } from "../../redux/ui-redux/ui.actions.js";
import Image from "../image/image.component.jsx";
import InputImage from "../inputs/input-image/input-image.component";
import { UpdateImageButtonContainer } from "../inputs/input-text/inputs.styles";
import { CoverPictureContainer, NoCoverPicture } from "./coverpicture.styles";
import withLoader from "../loaderHOC.component";
import { useImageResize } from "../../utils/ui-hooks.jsx";
import { useImageUploader } from "../../utils/misc-hooks.js";

const CoverPicture = ({
	userID,
	editable,
	images,
	setLoading,
	setTransparency,
}) => {
	const [selectedFile, setSelectedFile] = useState();
	const themeContext = useContext(ThemeContext);
	const dispatch = useDispatch();
	const containerRef = useRef();
	const url = `userprofiles/${userID}/coverimages`;

	const resizedImageLinks = useImageResize(images, containerRef, {
		cy: "25%25",
	});

	useImageUploader(selectedFile, setSelectedFile, setLoading, url);

	useEffect(() => {
		setLoading(false);
		setTransparency(true);
	}, [setLoading, setTransparency]);

	return (
		<CoverPictureContainer ref={containerRef}>
			{editable && (
				<React.Fragment>
					<UpdateImageButtonContainer htmlFor="coverImage">
						<FontAwesomeIcon icon={faCamera} />
					</UpdateImageButtonContainer>
					<InputImage
						setImageFn={(file) => setSelectedFile(file)}
						id="coverImage"
					/>
				</React.Fragment>
			)}

			{resizedImageLinks && resizedImageLinks.length ? (
				<div
					onPointerDown={() =>
						dispatch(setImageViewerArr(images))
					}
				>
					<Image
						image={
							resizedImageLinks[
								resizedImageLinks.length - 1
							]
						}
						style={{ cursor: "pointer" }}
					/>
				</div>
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

export default withLoader(CoverPicture);

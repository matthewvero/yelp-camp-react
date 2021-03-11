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
import { LoadingWaves, Wave } from "../misc/loadinganimations.styles.js";
import { CoverPictureContainer, NoCoverPicture } from "./coverpicture.styles";

const CoverPicture = ({ userID, editable, images }) => {
	const [loading, setLoading] = useState(false);
	const [selectedFile, setSelectedFile] = useState();
	const [resizedImageLinks, setResizedImageLinks] = useState([]);
	const themeContext = useContext(ThemeContext);
	const dispatch = useDispatch();
	const containerRef = useRef();

	const getImages = async (images) => {
		const height = containerRef.current.offsetHeight;
		const width = containerRef.current.offsetWidth;
		let imageLinks = [];

		if (images) {
			imageLinks = images.map(
				(image) =>
					`${image.link}?ch=${height}&w=${width}&cy=25%25`
			);

			setResizedImageLinks(imageLinks);
		}
	};

	const getImagesMemo = useCallback(getImages, []);

	// Await file input and upload
	useEffect(() => {
		const url = `userprofiles/${userID}/coverimages`;
		const uploadImage = async () => {
			setLoading(true);
			const res = await addImage(selectedFile, url);
			console.log(res);
			setLoading(false);
			setSelectedFile("");
		};
		if (selectedFile) {
			uploadImage();
		}
	}, [getImagesMemo, selectedFile, userID]);

	// load images from link or get
	useEffect(() => {
		getImagesMemo(images);
	}, [getImagesMemo, images]);

	return (
		<CoverPictureContainer
			ref={containerRef}
			onPointerDown={() => dispatch(setImageViewerArr(images))}
		>
			{editable && (
				<UpdateImageButtonContainer htmlFor="coverImage">
					<FontAwesomeIcon icon={faCamera} />
				</UpdateImageButtonContainer>
			)}

			{loading && (
				<LoadingWaves>
					<Wave />
					<Wave delay="500" />
				</LoadingWaves>
			)}

			<InputImage
				setImageFn={(file) => setSelectedFile(file)}
				id="coverImage"
			/>

			{resizedImageLinks && resizedImageLinks.length ? (
				<Image
					image={
						resizedImageLinks[
							resizedImageLinks.length - 1
						]
					}
				/>
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

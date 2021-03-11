import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { setImageViewerArr } from "../../redux/ui-redux/ui.actions";
import ImageCarousel from "../imagecarousel/imagecarousel.component";
import { ImageViewerContainer, ImageViewerContent } from "./imageviewer.styles";
import Button from "../button/button.component";
import { ThemeContext } from "styled-components";
import { useElementDimensions } from "../../utils/ui-hooks";

const ImageViewer = ({ images }) => {
	const viewerRef = useRef(null);
	const theme = useContext(ThemeContext);
	const dispatch = useDispatch();
	const [contentRef, setContentRef] = useState();
	const dimensions = useElementDimensions(contentRef);
	const [links, setLinks] = useState([]);

	useEffect(() => {
		if (dimensions) {
			const newLinksArr = images.map((image) => {
				return image.link;
			});
			setLinks(newLinksArr);
		}
		return () => {
			setLinks([]);
		};
	}, [contentRef, dimensions, images]);

	const onRefChange = useCallback((node) => {
		// ref value changed to node
		setContentRef(node); // e.g. change ref state to trigger re-render
	}, []);

	return (
		<CSSTransition
			in={images && images.length ? true : false}
			classNames={"imageviewer"}
			timeout={200}
			unmountOnExit
			nodeRef={viewerRef}
		>
			<ImageViewerContainer ref={viewerRef}>
				<div
					style={{
						position: "fixed",
						top: "10%",
						right: "10%",
					}}
				>
					<Button
						style={{
							padding: "10px 15px",
							borderRadius: "50%",
							backgroundColor: theme.main,
						}}
						fn={() => dispatch(setImageViewerArr([]))}
					>
						<FontAwesomeIcon
							icon={faTimes}
							style={{
								fontSize: "2rem",
								color: "crimson",
							}}
						/>
					</Button>
				</div>
				<ImageViewerContent ref={onRefChange}>
					<ImageCarousel
						images={links}
						style={{ objectFit: "contain" }}
					/>
				</ImageViewerContent>
			</ImageViewerContainer>
		</CSSTransition>
	);
};

export default ImageViewer;

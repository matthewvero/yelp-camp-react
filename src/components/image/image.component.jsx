import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Loader } from "../misc/loadinganimations.styles";
import { ImageContainer, ImageSwitcher } from "./image.styles";

const Image = ({ image, style }) => {
	const [loaded, setLoaded] = useState(false);
	const imageRef = useRef(null);
	return (
		<ImageContainer style={style}>
			<CSSTransition
				in={!loaded}
				classNames="image"
				timeout={500}
				unmountOnExit
				nodeRef={imageRef}
			>
				<ImageSwitcher ref={imageRef}>
					<Loader />
				</ImageSwitcher>
			</CSSTransition>

			<img
				style={{
					height: "100%",
					width: "100%",
					objectFit: "cover",
					top: "0",
					left: "0",
					visibility: `${loaded ? "visible" : "hidden"}`,
				}}
				alt="dynamic"
				src={image}
				onLoad={() => setLoaded(true)}
			/>
		</ImageContainer>
	);
};

export default Image;

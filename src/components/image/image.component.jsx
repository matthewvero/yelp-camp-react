import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Loader } from "../misc/loadinganimations.styles";
import { ImageContainer, ImageSwitcher } from "./image.styles";

const Image = ({ image, styles }) => {
	const [loaded, setLoaded] = useState(false)
	return (
		<ImageContainer style={styles}>
			<CSSTransition
				in={!loaded}
				classNames='image'
				timeout={500}
				unmountOnExit
			>
				<ImageSwitcher>
					<Loader/>
				</ImageSwitcher>
			</CSSTransition>
			
			
				
			<img
				style={{
					height: "100%",
					width: "100%",
					objectFit: "cover",
					top: '0',
					left: '0',
					visibility: `${loaded ? 'visible' : 'hidden'}`
				}}
				alt="dynamic"
				src={image}
				onLoad={() => setLoaded(true)}
			/>
			

			
		</ImageContainer>
	);
};

export default Image;

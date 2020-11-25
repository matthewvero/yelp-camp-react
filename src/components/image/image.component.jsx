import React from "react";
import { CSSTransition } from "react-transition-group";
import { Loader } from "../misc/loadinganimations.styles";
import { ImageContainer, ImageSwitcher } from "./image.styles";

const Image = ({ image }) => {
	return (
		<ImageContainer>
			<CSSTransition
				in={image ? true : false}
				classNames="image"
				timeout={1000}
				unmountOnExit
			>
				<ImageSwitcher>
					<img
						style={{
							height: "100%",
							width: "100%",
							overflow: "hidden",
							objectFit: "cover",
						}}
						alt="Your campground"
						src={image}
					/>
				</ImageSwitcher>
			</CSSTransition>

			<CSSTransition
				in={image ? false : true}
				classNames="image"
				timeout={1000}
				unmountOnExit
			>
				<ImageSwitcher>
					<Loader
						style={{ width: "100%", height: "100%" }}
					/>
				</ImageSwitcher>
			</CSSTransition>
		</ImageContainer>
	);
};

export default Image;

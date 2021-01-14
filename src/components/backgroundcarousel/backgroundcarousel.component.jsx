import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { usePreloadImages } from "../../utils/ui-hooks";
import {
	Fader,
	BackgroundCarouselContainer,
	BackgroundCarouselSlide,
} from "./backgroundcarousel.styles";
const images = [
	"https://images.unsplash.com/photo-1588392382834-a891154bca4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2555&q=80",
	"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2551&q=80",
	"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
	"https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
];

const BackgroundCarousel = () => {
	const [activeImage, setActiveImage] = useState(0);
	const imagesArr = usePreloadImages(images)

	useEffect(() => {
		let interval;

		setTimeout(() => {
			setActiveImage((val) => (val + 1) % images.length);
			interval = setInterval(() => {
				setActiveImage((val) => (val + 1) % images.length);
			}, 4000);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<BackgroundCarouselContainer>
			{imagesArr.length > 0 && (
				<Fader>
					{imagesArr.map((el, idx) => (
						<CSSTransition
							classNames="image"
							timeout={3000}
							key={idx}
							in={activeImage === idx}
							unmountOnExit
						>
							<BackgroundCarouselSlide>
								{el}
							</BackgroundCarouselSlide>
						</CSSTransition>
					))}
				</Fader>
			)}
		</BackgroundCarouselContainer>
	);
};

export default BackgroundCarousel;
